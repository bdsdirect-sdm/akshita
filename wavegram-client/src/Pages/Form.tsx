import imageLogo from "../assets/waves.png";
import { FormProps } from "../interfaces/interfaces";

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <div>
      <div className=" h-screen flex flex-row">
        {/* <div className=' w-[50%] bg-gradient-to-b from-customGreen 
           to-teritory lg:flex flex-row items-center justify-center gap-2 hidden'>
            <img src={imageLogo} alt="logo" className="w-[105px] h-[105px]"/>  
            <div className=" font-bold text-4xl text-white gap-x-0">EYE REFER</div>     
             </div> */}
        <img className="w-[50%]" src={imageLogo} alt="logo" />
        <div className=" lg:w-[50%] sm:w-[100%] bg-white p-10  items-center justify-center overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Form;
