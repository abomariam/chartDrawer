var num=0;
var nume=0;
function messagedone()
{
	if(num!=0 && nume!=0 && document.getElementById("subject").value!=" Subject")
		
	{			
		 
		document.getElementById("message").innerHTML="<p align='center'><font color='green'><b>Your message send successfuly</b></font></p>";
			
		document.getElementById("subject").value="";
		document.getElementById("nametxt").value="";
		document.getElementById("emailtxt").value="";
		document.getElementById("txtarea").value="";


	}
	else
	{
			document.getElementById("message").innerHTML="<p align='center'><font color='red'><b>Your message isn't complete </b></font></p>";

	}
}
function testname()
{
	var name=document.getElementById("nametxt").value;
	var regname=/^([A-Z]{3,})$/ig;
	num=regname.test(name);
	if(num==0)
	{
		//document.getElementById("nametxt").focus();
		document.getElementById("name_check").innerHTML="<font color='red'>Invalid name'name must be at least 3 characters '</font>";

	}
	else if( num!=0 && document.getElementById("nametxt").value!=" Your name")
	{
		
		document.getElementById("name_check").innerText="";

	}
}
function testemail()
{
	var email=document.getElementById("emailtxt").value;
	var regemail=/\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}\b/ig;
	nume=regemail.test(email);
	if(nume==0)
	{
		//document.getElementById("emailtxt").focus();
		document.getElementById("email_check").innerHTML="<font color='red'>Invalid email</font>";

	}
	else if( document.getElementById("emailtxt").value!=" Your email" && nume !=0)
	{
		document.getElementById("email_check").innerText="";
	}
}
function resetmessage()
{
		document.getElementById("email_check").innerText="";
		document.getElementById("name_check").innerText="";
		document.getElementById("message").innerText="";


}