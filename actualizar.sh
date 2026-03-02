#!/bin/bash

echo "🔄 Iniciando actualización del menú..."

# 1. Generar el nuevo JSON desde la DB
node generar_menu.js

if [ $? -eq 0 ]; then
    echo "✅ JSON generado correctamente."

    # 2. Subir a GitHub
    git add .
    git commit -m "Actualización automática: $(date +'%Y-%m-%d %H:%M:%S')"
    git push origin main

    echo "🚀 ¡Menú en vivo y actualizado!"
else
    echo "❌ Error al generar el JSON. No se subió nada."
fi
