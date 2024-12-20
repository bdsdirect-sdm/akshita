import React from 'react'
import Button from "../components/Button"
import CancelButton from "../components/CancelButton"
import {useNavigate} from "react-router-dom"

const SaveCancel = () => {
    const navigate = useNavigate()
  return (
    <div className="flex gap-6">
        <CancelButton
            onClick={() => navigate("/staff-list")}
            >
            Cancel
        </CancelButton>
        <Button type="submit">
            Submit
        </Button>
    </div>

  )
}

export default SaveCancel