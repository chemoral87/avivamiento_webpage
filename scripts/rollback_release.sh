#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

APP_DIR="/var/www/avivamiento_webpage"
RELEASES_DIR="$APP_DIR/releases"
CURRENT_LINK="$APP_DIR/current"

error_exit() {
  echo -e "${RED}❌ Error: $1${NC}"
  exit 1
}

# List releases if no argument given
if [ -z "$1" ]; then
  echo -e "${YELLOW}📋 Available releases:${NC}"
  ls -1t "$RELEASES_DIR"
  echo -e "${YELLOW}=== Current release ===${NC}"
  readlink "$CURRENT_LINK"
  error_exit "Usage: $0 <release_name>"
fi

RELEASE_NAME="$1"
RELEASE_PATH="$RELEASES_DIR/$RELEASE_NAME"

if [ ! -d "$RELEASE_PATH" ]; then
  echo -e "${RED}❌ Release '$RELEASE_NAME' not found.${NC}"
  echo -e "${YELLOW}📋 Available releases:${NC}"
  ls -1t "$RELEASES_DIR"
  exit 1
fi

echo -e "${YELLOW}⏪ Rolling back to: $RELEASE_NAME${NC}"

# Update symlink atomically (zero downtime)
ln -sfn "$RELEASE_PATH" "$CURRENT_LINK" || error_exit "Symlink update failed"

# Restart app using ecosystem config
pm2 startOrRestart "$CURRENT_LINK/ecosystem.config.cjs" --update-env || error_exit "pm2 restart failed"
pm2 save

echo -e "${GREEN}✅ Rollback to $RELEASE_NAME completed successfully!${NC}"
