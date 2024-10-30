#!/bin/sh

echo "Esperando a que la base de datos esté disponible..."

# Bucle hasta que podamos conectar a la base de datos
until nc -z -v -w30 db 5432
do
  echo "Esperando conexión a la base de datos..."
  sleep 1
done

echo "La base de datos está arriba - ejecutando comando"

exec "$@"
