#!/bin/bash
# Script to export all PlantUML diagrams to preview-diagram folder
# Requires: PlantUML jar file

echo "Exporting all PlantUML diagrams..."

# Export each diagram to its folder
java -jar plantuml.jar -tpng 01_use_case_diagram.puml -o preview-diagram/01_use_case
java -jar plantuml.jar -tpng 02_activity_diagram.puml -o preview-diagram/02_activity
java -jar plantuml.jar -tpng 02a_activity_ordering.puml -o preview-diagram/02_activity
java -jar plantuml.jar -tpng 02b_activity_payment.puml -o preview-diagram/02_activity
java -jar plantuml.jar -tpng 02c_activity_kitchen.puml -o preview-diagram/02_activity

echo "Export complete!"
