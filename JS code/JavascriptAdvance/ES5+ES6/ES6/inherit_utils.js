function createObject(type){
    function f(){};
    f.prototype = type;
    return new f();
}

function inherit(Subtype,Supertype){
    //后续新方法存在一定兼容问题
    // Object.setPrototypeOf(Subtype.prototype,Supertype.prototype);
    Subtype.prototype = createObject(Supertype.prototype);
    Object.defineProperty(Subtype.prototype,"constructor",{
        enumerable:false,
        configurable:true,
        writable:true,
        value:Subtype
    })
}