import * as reportCardService from "../services/reportCardService.js"
import express from "express"
import { config as dotenvConfig } from "dotenv"
import aws from "aws-sdk"

dotenvConfig()

const router = express.Router()
const s3 = new aws.S3()
const BUCKET_NAME = process.env.BUCKET_NAME

router.post("/generateStrengthsNextSteps", async (req, res) => {
  const completion = await reportCardService.generateStrengthsNextSteps(req.body)
  res.send(completion)
})

router.get("/grade1to6provincial", async (req, res) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: "reportCardGr1-6.pdf",
    Expires: 300,
  }

  s3.getSignedUrlPromise("getObject", params, (err, presignedUrl) => {
    if (err) {
      console.error(err)
      res.status(500).send("Error generating download link")
    } else {
      console.log(presignedUrl)
      res.json({ downloadUrl: presignedUrl })
    }
  })
})

export default router
