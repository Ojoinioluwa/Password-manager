const asyncHandler = require("express-async-handler");
const hibp = require("hibp");

const breachController = {
  checkBreachEMail: asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Need an email" });
    }

    try {
      const breaches = await hibp.breachedAccount(email);
      res.json(breaches || []);
    } catch (err) {
      if (err.message?.includes("404")) {
        res.status(404).json([]);
      } else {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
      }
    }
  }),

  checkIfCompanyBreached: asyncHandler(async (req, res) => {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ message: "Company name is required" });
    }

    try {
      const allBreaches = await hibp.breaches();
      const matches = allBreaches.filter((breach) => {
        const nameMatch = breach.Name.toLowerCase().includes(company.toLowerCase());
        const domainMatch = breach.Domain?.toLowerCase().includes(company.toLowerCase());
        return nameMatch || domainMatch;
      });

      res.status(200).json(matches);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  })
};

module.exports = breachController;
