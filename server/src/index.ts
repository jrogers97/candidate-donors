import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { getCandidateData } from './openSecretsApi';

interface Candidate {
	cid: string;
	crpName: string;
	party: string;
	distIDRunFor: string;
	feccAndId: string;
}

const candidates: Candidate[] = require(path.join(__dirname, "../candidates2020.json"));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const errorCatcher = (req: express.Request, res: express.Response, next: Function) => {
    if (!candidates || !candidates.length) {
        res.status(501);
    } else {
        next();
    }
}

app.use(errorCatcher);

// get matching candidates from static JSON file
app.get("/candidates", (req, res) => {
    const name: string = req.query ? req.query.name as string : "";
    if (!name) {
        res.status(201).json([]);
        return;
    }
    const filteredCandidates = candidates.filter((cand: Candidate) => {
        return cand.crpName.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });

    res.status(201).json(filteredCandidates);
});

// proxy for Open Secrets summary route
app.get("/summary", async (req, res) => {
    const cid = req.query ? req.query.cid as string : "";
    if (!cid) {
        res.status(400);
    }
    res.json(await getCandidateData(cid, "candSummary"));
});

// proxy for Open Secrets contributors route
app.get("/contributors", async (req, res) => {
    const cid = req.query ? req.query.cid as string : "";
    if (!cid) {
        res.status(400);
    }
    res.json(await getCandidateData(cid, "candContrib"));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
