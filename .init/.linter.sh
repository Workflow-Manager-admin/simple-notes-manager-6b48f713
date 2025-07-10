#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-notes-manager-6b48f713/frontend_nuxt
npx eslint 
$ESLINT_EXIT_CODE
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

