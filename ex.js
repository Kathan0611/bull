// const { isCurrency } = require("validator");

nums=[3,2,4];
target=6;
nums.sort((a,b)=>a-b);
// console.log(nums)
 let start=0,end=nums.length-1;
 let arr2 =new Set();
while(start<end){
if(nums[start]+nums[end]==target){
     arr2.add(nums[start]);
     arr2.add(nums[end]);
    console.log([...arr2])
    let a=[...arr2].map(curr=>nums.indexOf(curr)); 
    console.log(a)
    return ;
}
else if(nums[start]+nums[end]>target){
    end--;
}
else{
    start++;
}

}