import * as React from 'react';
import Blog from "../components/Blog"
import axios from 'axios';

export async function getServerSideProps(req, res) {
  axios({
    url: `${process.env.HOSTNAME}/api/registry`,
    method: "post",
    data: req.req.headers
  })
  
  return {
    props: {}
  }
}
export default function index() {
  return (
    <Blog/>
  );
} 