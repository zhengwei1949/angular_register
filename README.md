## 需求分析
![](http://7fvanf.com1.z0.glb.clouddn.com/17-8-4/88151191.jpg)
## 思路
1. 引包
```html
<script src="libs/angular.js"></script>
```
2. 初始化模块
```html
<body ng-app="myApp">
</body>
```

```javascript
var app = angular.module('myApp',[])
```

3. 初始化控制器
```html
<table ng-controller="demoController">
</table>
```

```javascript
app.controller('demoController',function($scope){})
```

4. 根据项目需求创建视图模板
```html
<table ng-controller="demoController">
    <tr><td>用户名: <input type="text"></td></tr>
    <!-- <tr><td>用户类型: <input type="text" ng-model="usertype"></td></tr> -->
    <tr><td>
    <input type="text">
    </td></tr>
    <tr><td>密码: <input type="text"></td></tr>
    <tr><td>确认密码: <input type="text"></td></tr>
    <tr><td>注册协议: <input type="checkbox" ></td></tr>
    <tr><td><input type="button" value="注册" ></td></tr>
    <tr><td></td></tr>
  </table>
```

5. 根据项目需求构建数据模型、完善视图
```html
<table ng-controller="demoController">
    <tr><td>用户名: <input type="text" ng-model="username"></td></tr>
    <!-- <tr><td>用户类型: <input type="text" ng-model="usertype"></td></tr> -->
    <tr><td>
    <input type="text" ng-model="usertype">
    </td></tr>
    <tr><td>密码: <input type="text" ng-model="userpwd"></td></tr>
    <tr><td>确认密码: <input type="text" ng-model="confirmpwd"></td></tr>
    <tr><td>注册协议: <input type="checkbox" ng-model="isagree"></td></tr>
    <tr><td><input type="button" value="注册" ng-click="register()"></td></tr>
    <tr><td>{{msg}}</td></tr>
  </table>
```

```javascript
app.controller('demoController',function($scope){
      // 初化数据模型
      $scope.username = ''
      $scope.usertype = ''
      $scope.userpwd = ''  
      $scope.confirmpwd = ''
      $scope.isagree = false
      $scope.msg = ''

      // 初始化行为模型
      $scope.register = function(){

      }
        
    })
```

6. 在控制器中，对来自view视图的数据进行校验合法性
```javascript
$scope.register = function(){
                // 判断用户名
        if($scope.username.length<6){
          // alert('用户名太短!')
          $scope.msg='用户名太短！'
          return
        }
        if($scope.userpwd.length<6){
          $scope.msg='密码太短,不安全!'
          return
        }
        if($scope.userpwd !== $scope.confirmpwd){
          $scope.msg='两次输入的密码不一致，请重新输入!'
          return 
        }

        
      }
        
    })
```

7. 把数据模型存到localStorage

- 定义：
```javascript
// Model 开始
    function User(name,pwd,type){
      this.name = name
      this.pwd = pwd
      this.type = type
    }
    // 存储数据的方法
    User.prototype.save = function(){
      // 判断用户名是否存在
      // myusers
      var str = localStorage.getItem('myusers')||'[]'
      var arr = JSON.parse(str)
      for (var i = 0; i < arr.length; i++) {
         // 如果存在则返回false表明注册失败
        if(arr[i].name===this.name){
          return 
        }
      }
      // 如果不存在，要把数据保存起来，返回true表示注册成功
      arr.push({name:this.name,pwd:this.pwd,type:this.type})
      localStorage.setItem('myusers',JSON.stringify(arr))
      return true
      // [{name:,pwd},{}]
      // localStorage.setItem('','')
    }
```

- 调用
```javascript
var u = new User($scope.username,$scope.userpwd,$scope.usertype)
        // 我们希望得到一个返回值表明是否注册成功!
        var result = u.save()
        if(result){
          $scope.msg = '注册成功!'
        }else{
          $scope.msg = '注册失败！'
        }
```

## 简单理解mvc


