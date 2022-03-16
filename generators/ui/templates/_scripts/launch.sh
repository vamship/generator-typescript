#!/bin/sh

cat << EOF > /usr/share/nginx/html/env.js

window.CONFIG_ENV = {
};

EOF

echo "Launching nginx"
nginx -g 'daemon off;'
