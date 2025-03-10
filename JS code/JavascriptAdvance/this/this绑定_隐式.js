function foo(){
    console.log("foo:",this);
}

var obj = {
    bar:foo
}

obj.bar();