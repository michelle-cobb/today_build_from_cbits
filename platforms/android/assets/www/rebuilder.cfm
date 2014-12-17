
<h2 style="font-family:Arial, Helvetica, sans-serif;">In order to synchronize editor content with the application, press the button below:</h2>

<cfform method="get">

<input type="submit" value="Rebuild Now" />
<cfinput type="checkbox" name="validator" required="yes" message="You must select the checkbox to rebuild!">

</cfform>

<cfif isdefined("url.validator")>
<cfquery name="pull_all" datasource="#datasource#">
SELECT * FROM nav_elements ORDER BY orderer ASC, cal_day ASC
</cfquery>
<cffunction name="queryToJSON" returntype="string" access="public" output="yes">
  <cfargument name="q" type="query" required="yes" />
  <cfset var o=ArrayNew(1)>
  <cfset var i=0>
  <cfset var r=0>
  <cfloop query="Arguments.q">
    <cfset r=Currentrow>
    <cfloop index="i" list="#LCase(Arguments.q.columnList)#">
      <cfset o[r][i]=Evaluate(i)>
    </cfloop>    
  </cfloop>
  <cfreturn SerializeJSON(o)>
</cffunction>
<cfset json_dump = queryToJSON(pull_all)>

<cffile action = "write" nameconflict="overwrite"
    file = "#local_path#\content.js" 
    output = "var appContent = #json_dump#;">
    
    <cffile action = "write" nameconflict="overwrite"
    file = "c:\inetpub\wwwroot\parakeet\build\js\app\content.js" 
    output = "var appContent = #json_dump#;">

<cfquery name="pull_all" datasource="#datasource#">
SELECT * FROM questions ORDER BY tool_id ASC, page ASC, orderer ASC
</cfquery>

<cfset json_dump = queryToJSON(pull_all)>

<cffile action = "write" nameconflict="overwrite"
    file = "#local_path#\questions.js" 
    output = "var questionContent = #json_dump#;">
    
    <cffile action = "write" nameconflict="overwrite"
    file = "c:\inetpub\wwwroot\parakeet\build\js\app\questions.js" 
    output = "var questionContent = #json_dump#;">
    



 
 Successfully rebuilt.
    
</cfif>