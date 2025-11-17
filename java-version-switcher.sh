#!/bin/bash

# Java Version Switcher Script
# Usage: ./java-version-switcher.sh [8|21]

case "$1" in
  8)
    echo "Switching to Java 8 (Amazon Corretto)..."
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/amazon-corretto-8.jdk/Contents/Home
    export PATH=$JAVA_HOME/bin:$PATH
    echo "Java version:"
    java -version
    ;;
  21)
    echo "Switching to Java 21 (OpenJDK)..."
    export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
    export PATH=/opt/homebrew/opt/openjdk@21/bin:$PATH
    echo "Java version:"
    java -version
    ;;
  *)
    echo "Usage: $0 [8|21]"
    echo "Current Java version:"
    java -version
    ;;
esac