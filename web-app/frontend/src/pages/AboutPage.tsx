import React, { useState } from "react";
import { css } from "@emotion/css";

import { Layout } from "@comp/Layout";
import { Loading } from "@comp/Loading";
import { XmasCanvas } from "@comp/canvas/XmasCanvas";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>      
      <Layout>
        { isLoading ? <Loading/> : null }
        <XmasCanvas setIsLoading={setIsLoading}/>
      </Layout>
    </>
  )
}