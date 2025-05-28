const utilsName = "utils";

function formatCount(){
    return 2000
};

function formatDate(){
    return "2025-5-14";
};

exports.utilsName = utilsName;
exports.formatCount = formatCount;
exports.formatDate = formatDate;

setTimeout(() => {
    exports.utilsName = "Cookie";
},2000)
