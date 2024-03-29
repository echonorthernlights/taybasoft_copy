import React from "react"

import { FaPeopleGroup } from "react-icons/fa6"
import { GoPackage } from "react-icons/go"
import { MdQueryStats } from "react-icons/md"

const links = [
  {
    text: "dashboard",
    path: ".",
    icon: <MdQueryStats />,
  },
  {
    text: "abonnés",
    path: "subscribers",
    icon: <FaPeopleGroup />,
  },
  {
    text: "packs d'abonnement",
    path: "packs",
    icon: <GoPackage />,
  },
]

export default links
