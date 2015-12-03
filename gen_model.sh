# lovefield-spac --schema app/models/hr_schema.yaml --outputdir app/scripts/ --namespace lerp.hr
# lovefield-spac --schema app/models/docs_schema.yaml --outputdir app/scripts/ --namespace lerp.docs


# clojure compiler
java -jar compiler.jar \
  --warning_level VERBOSE \
  --js app/scripts/hr_gen.js \
  --js_output_file app/scripts/hr-compiled.js \
  --externs bower_components/lovefield/dist/lovefield.externs.js \
  --externs bower_components/lovefield/dist/lovefield.js
