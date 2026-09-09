#Turbo-repo  keypoints:
1. You can link with vercel deployment for remote caching
and vercel deploys will be able to use this cache and deploy much faster 

Types of packages->
just in time package-> exports raw ts modules 
JS will ;eave it to transpile up to the consuming application 
ie- only when it is used in an application is it compiled, never otherwise
when it needs it, right before, on demand, JUST IN TIME-> 
! low configuration way, has limitations:
1. Can't cache builds for this package [because it DOESN'T compile until it is used-> or CHANGES are made in its consuming application ????? -- my assumotion for this reason not sure yet]
2. TS doesn't transpile in the same location therefore you can't use the compilerOptions: paths shit ???
3. Typecheck will check in consumer application and errors will not show here, only on the consumer app ie- if there are errors in .ts file in a package that is used by a consumer application, the errors in that .ts file WILL ALSO show up in console when only the consu,er application is run
compile package-> will export js not ts
just compile here, add a dist and export the dist instead, add the scripts-> build, dev then add the outDir in tsconfig.json under compiler options
then make turbo repo aware of these newly outputed builds for caching aka add dist there


DO NOT do chatgpt version of exports in index,ts, use the OTHER way to export that is in the exports:{
    "xyz":"dist/xyz.js"
}
because they make bundling slower, as this file format is incredibly demanding for bundlers to analyze 
and for many other reasons ...

Must support:

Partial tokens

Function calling

Barge-in cancellation


apps/
  api                ← CRUD, workflows, calendar, auth
  avatar             ← MuseTalk ONLY (no LLM, no RAG)
  fe                 ← UI
  media-router       ← WebRTC SFU
  session-engine     ← ✅ AGENT RUNTIME (LLM lives here)

packages/
  rag                ← ✅ RAG ingestion + retrieval logic
  db                 ← embeddings metadata, mappings
  auth
  ui
