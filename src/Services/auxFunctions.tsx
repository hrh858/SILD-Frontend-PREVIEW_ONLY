
export const fcn_moveToErrorPage = (idError:number)=>
{   
    // console.log(window.location.href)
    window.location.href = window.location.origin.toString()+"/error/"+idError;

}


export const fcn_sanitizeStringAlphanumeric = (text:string)=>
{   
    return text.replace(' ', '_').replace(/[^a-zA-z0-9]/, '');
}