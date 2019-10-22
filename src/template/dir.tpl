<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{ title }}</title>
	<style>
		body {
		  margin: 30px;
		}
		a {
		  display: block;
		  font-size: 20px;
		}
		a:link { 
		  color:#3C3C3C; 
		  text-decoration:underline; 
		} 
		a:visited { 
		  color:#3C3C3C; 
		  text-decoration:underline; 
		} 
		a:hover { 
		  color:#FF00FF; 
		  text-decoration:none; 
		} 
		a:active { 
		  color:#3C3C3C; 
		  text-decoration:underline; 
		}
		.back {
		  margin-bottom: 20px;
		}
		.root {
		  font-weight: bold;
		  font-size: 30px;
		}
		span{
		  font-weight: bold;
		  display: inline-block;
		  margin-right: 100px;
		  letter-spacing: 20px;
		}
	</style>
</head>
<body>
<div class="root">{{ root }}{{dir}}</div>
<div>-------------------------------------------------------------------------------</div>
<a href="javascript:;" onclick="window.history.go(-1)" class="back"><上级目录</a>
<span>名称</span>
{{#each files}}
  <a href="{{../dir}}/{{this}}">{{@index}}:{{ this }}</a>
{{/each}}
</body>
</html>