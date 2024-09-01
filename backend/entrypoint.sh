#!/usr/bin/env bash
set -e

# Run migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Start the application
exec "$@"

dos2unix entrypoint.sh
