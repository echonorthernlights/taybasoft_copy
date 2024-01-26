import React, { useEffect, useState } from "react"
import { Form, useNavigate, useParams } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import FormRow from "../../../components/FormRow"
import Loader from '../../../components/Loader'
import SubmitBtn from "../../../components/SubmitBtn"
import {
  useGetPackDetailsQuery,
  useGetPacksQuery,
  useUpdatePackMutation,
} from "../../../slices/subscriptions/packsApiSlice"
import { toastHandler } from "../../../utils/toastHandler"

const UpdatePack = () => {
  const { packId } = useParams()
  const navigate = useNavigate()
  const [updatedPack, setUpdatedPack] = useState({})
  const { data: packData, isLoading, error } = useGetPackDetailsQuery(packId)
  const { refetch: refetchPacks } = useGetPacksQuery()
  const [updatePack, { isLoading: loadingPack }] = useUpdatePackMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await updatePack(updatedPack).unwrap()
      toastHandler(result, "success")
      await refetchPacks()
      navigate("/app/packs")
    } catch (err) {
      toastHandler(err, "error")
    }
  }
  const handleChange = (e) => {
    setUpdatedPack({
      ...updatedPack,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (packData) {
      setUpdatedPack(packData)
    }
  }, [packData])

  if (error) {
    throw error
  }

  return (
    <Wrapper>
      <h2 className="title form-title">Modifier pack</h2>
      {isLoading ? <Loader /> : (
        <Form onSubmit={handleSubmit} className="form">
          <FormRow
            type={"text"}
            name={"designation"}
            labelText={"Désignation"}
            onChange={handleChange}
            value={updatedPack.designation || ""}
          />
          <FormRow
            type={"text"}
            name={"duration"}
            labelText={"Durée"}
            onChange={handleChange}
            value={updatedPack.duration || ""}
          />
          <FormRow
            type={"text"}
            name={"price"}
            labelText={"Prix"}
            onChange={handleChange}
            value={updatedPack.price || ""}
          />
          <FormRow
            type={"text"}
            name={"nbrClients"}
            labelText={"Nombre de clients"}
            onChange={handleChange}
            value={updatedPack.nbrClients || ""}
          />
          <FormRow
            type={"text"}
            name={"nbrProjects"}
            labelText={"Nombre de projets"}
            onChange={handleChange}
            value={updatedPack.nbrProjects || ""}
          />
          <FormRow
            type={"text"}
            name={"promotion"}
            labelText={"Promotion %"}
            value={updatedPack.promotion || ""}
            onChange={handleChange}
          />
          <SubmitBtn formBtn isLoading={loadingPack} />
        </Form>
      )}
    </Wrapper>
  )
}

export default UpdatePack
