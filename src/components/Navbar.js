
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div style={{height:"80px",background:"#000",display:"flex",justifyContent:"space-between",alignItems:"center",color:"#fff",fontFamily: "Roboto",fontSize:"18px"}}>
      <div style={{display:"flex",paddingLeft:"30px"}}>
      <Link href='/' passHref>
          <div>Home</div>
        </Link>
        <Link href='/' passHref>
          <div style={{paddingLeft:"30px"}}>Contact</div>
        </Link>
        
      </div>
      <div>
        <Link href='/' passHref style={{display:"flex",marginRight:"30px"}}>
        <Image src="/images/loginImg.png" width="40" height="40"/>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;