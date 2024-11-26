import { IoIosSearch } from "react-icons/io";
import Button from "./Button"

const Searchbar = () => {
    return (<>
    <div className="">
        <input className="border-gray-400 py-3 px-3 w-1/4 rounded active:border-[#2A99B6] m-4" placeholder="Search"/>
        <Button><IoIosSearch />Search</Button>
    </div>
    </>)
}

export default Searchbar;