import React from "react";
import { AnimatePresence } from 'framer-motion'

import { DrawCanvas } from "@comp/canvas/DrawCanvas";
import { Layout } from "@comp/Layout";
import { Grid } from "@comp/Grid";
import { Loading } from "@comp/Loading";
import { CircleCanvas } from "@comp/canvas/CircleCamvas";

export default function SecondPage() {
  return (
    <>
      <Layout>
        <Loading/>
        <Grid>
          <DrawCanvas color={'#fff1f1'}/>
        </Grid>
        <CircleCanvas/>
      </Layout>
    </>
  );
}