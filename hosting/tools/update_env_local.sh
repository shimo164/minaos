#!/bin/bash
# This script is used for deploying hosting services
# to either localhost or production environments.
set -eou pipefail

update_env_variable() {
  local var_name="$1"
  local target_value="$2"
  local env_file="$3"

  if ! grep -q "^$var_name=" "$env_file"; then
    echo "$var_name is not set in $env_file"
    echo "Update: $env_file"
    exit 1
  elif ! grep -q "^$var_name=$target_value$" "$env_file"; then
    echo "Updating $var_name in $env_file..."
    tmp_file=$(mktemp)
    sed "s|^$var_name=.*|$var_name=$target_value|" "$env_file" >"$tmp_file"
    cp "$tmp_file" "$env_file" && rm "$tmp_file"
  fi
}

change_directory() {
  local target_dir="$(git rev-parse --show-toplevel)/hosting"
  cd "$target_dir" || {
    echo "Failed to change directory to $target_dir"
    exit 1
  }
}

select_deployment_target() {
  echo "Select deployment target: (local / dev / prod)"
  read -rp "Enter your choice: " choice

  case $choice in
  local | dev | prod)
    TARGET="$choice"
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
  esac

  echo "[INFO] TARGET: $TARGET"
}

# Check for Firebase CLI
if ! command -v firebase &>/dev/null; then
  echo "Firebase CLI not found. Please install it before running this script."
  exit 1
fi

# Load the .env.local file
echo $(dirname "$0")
env_file="$(dirname "$0")/../.env.local"
if [ ! -f "$env_file" ]; then
  echo "Environment file $env_file not found."
  exit 1
fi

select_deployment_target

EMULATOR_PORT="5555"
FUNCTION_NAME=analyze_content_with_gemini

# Change the target by TARGET variable.
if [ "$TARGET" == "prod" ] || [ "$TARGET" == "dev" ]; then
  TARGET_WEB_APP_URL="https://${PROJECT_ID}.web.app"
  TARGET_CLOUD_RUN_FUNCTION_URL="https://asia-east1-${PROJECT_ID}.cloudfunctions.net/${FUNCTION_NAME}"
elif [ "$TARGET" == "local" ]; then
  TARGET_WEB_APP_URL="http://localhost:3000"
  TARGET_CLOUD_RUN_FUNCTION_URL="http://localhost:${EMULATOR_PORT}/${PROJECT_ID}/asia-east1/${FUNCTION_NAME}"
fi

update_env_variable "NEXT_PUBLIC_FIREBASE_WEB_APP_URL" "$TARGET_WEB_APP_URL" "$env_file"
update_env_variable "NEXT_PUBLIC_FIREBASE_CLOUD_RUN_FUNCTION_URL" "$TARGET_CLOUD_RUN_FUNCTION_URL" "$env_file"

echo "[INFO] NEXT_PUBLIC_FIREBASE_WEB_APP_URL: $TARGET_WEB_APP_URL"
echo "[INFO] NEXT_PUBLIC_FIREBASE_CLOUD_RUN_FUNCTION_URL: $TARGET_CLOUD_RUN_FUNCTION_URL"

echo "Opening the environment file for review..."
code "$env_file"
