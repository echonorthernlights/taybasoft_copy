import React, { useEffect, useState } from "react"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import FormRow from "../../../components/FormRow"
import Loader from "../../../components/Loader"
import SubmitBtn from "../../../components/SubmitBtn"
import { useGetPacksQuery } from "../../../slices/subscriptions/packsApiSlice"
import {
  useGetSubscriptionDetailsQuery,
  useGetSubscriptionsBySubscriberQuery,
  useUpdateSubscriptionMutation,
} from "../../../slices/subscriptions/subscriptionsApiSlice"
import { toastHandler } from "../../../utils/toastHandler"
const UpdateSubscription = () => {
  const { subscriptionId, subscriberId } = useParams()
  const [updatedSubscriptionFormData, setUpdatedSubscriptionFormData] =
    useState({})
  const [updateSubscription, { isLoading: updateSubscriptionLoading }] =
    useUpdateSubscriptionMutation()
  const navigate = useNavigate()
  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    error: subscriptionError,
  } = useGetSubscriptionDetailsQuery(subscriptionId)

  const {
    data: packsData,
    isLoading: packsDataLoading,
    error: packsDataError,
  } = useGetPacksQuery()

  const { refetch } = useGetSubscriptionsBySubscriberQuery(subscriberId)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await updateSubscription(
        updatedSubscriptionFormData
      ).unwrap()
      toastHandler(result, "success")
      await refetch()
      navigate(`/app/subscribers/${subscriberId}`)
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  const handleChange = (e) => {
    setUpdatedSubscriptionFormData({
      ...updatedSubscriptionFormData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (subscriptionData && subscriptionData.endDate) {
      setUpdatedSubscriptionFormData({ ...subscriptionData })
    }
  }, [subscriptionData])

  if (subscriptionError) {
    return (<div>{subscriptionError}</div>)
  }

  return (
    <Wrapper>
      <h2 className="form-title">Modifier Un Abonnement</h2>
      <Form method="POST" onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label className="form-label">Pack abonnement</label>

          {packsDataLoading ? (
            <Loader />
          ) : (
            <select
              name="packId"
              className="form-select"
              onChange={handleChange}
              value={updatedSubscriptionFormData.packId || ""}
            >
              {packsData.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.designation}
                </option>
              ))}
            </select>
          )}
        </div>
        {!subscriptionLoading && (
          <>
            {" "}
            <FormRow
              type={"date"}
              name={"startDate"}
              labelText={"Date debut"}
              onChange={handleChange}
              value={updatedSubscriptionFormData.startDate || ""}
            />
            <FormRow
              type={"date"}
              name={"endDate"}
              labelText={"Date fin"}
              onChange={handleChange}
              value={updatedSubscriptionFormData.endDate || ""}
            />
            <FormRow
              type={"text"}
              name={"paymentMethod"}
              labelText={"Methode de paiement"}
              onChange={handleChange}
              value={updatedSubscriptionFormData.paymentMethod || ""}
            />
            <FormRow
              type={"date"}
              name={"paymentDate"}
              labelText={"Date de paiement"}
              onChange={handleChange}
              value={updatedSubscriptionFormData.paymentDate || ""}
            />
            <FormRow
              type={"number"}
              name={"totalAmount"}
              labelText={"Total"}
              onChange={handleChange}
              value={updatedSubscriptionFormData.totalAmount || ""}
            />
          </>
        )}

        <div className="buttons-container">
          <SubmitBtn formBtn isLoading={subscriptionLoading} />
          <Link
            className="btn btn-secondary"
            to={`/app/subscribers/${subscriberId}`}
          >
            retour
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default UpdateSubscription
