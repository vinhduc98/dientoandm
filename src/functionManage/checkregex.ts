export class RegexHandle{
    // true là chuỗi có dấu, false là chuỗi thường
    async kiemTraChuoiCoDau (chuoi:string){
        let format = /[^.@#$%^&*!?/+=`~(){}|0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi;
        return format.test(chuoi);
    }

}