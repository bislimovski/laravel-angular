<!DOCTYPE html>
<html ng-app="mainApp">
<head>
    <title>Gallery application in Angular JS</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
    <script>var baseUrl="{{url('/')}}/";</script>
</head>
<body>
    <div class="container">
        <!--You must declare ng-view in order the routes to take efect -->
        <div ng-view></div>
    </div>
    <script type="text/javascript" src="{{asset('bower_components/jquery/dist/jquery.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/bootstrap/dist/js/bootstrap.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>

    <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/models.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/controllers.js')}}"></script>

</body>
</html>