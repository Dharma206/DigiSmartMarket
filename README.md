# DigiSmartMarket
This is a web app built on React and Node.js with a PostgreSQL database. 

Market Admin: Registers markets and manages market vendors and laborers.

Registers new markets.
Approves access requests from market vendors.
Manages market vendor information, including viewing and deleting vendors.
Views all data about produce and laborers added by vendors.
Market Vendor: Registers and adds details of produce and laborers.

Registers under an existing market and sends access requests to the market admin.
Once approved, the vendor can add produce details, including crop name, quantity, amount, and assigned laborers.
Can also add, edit, and delete laborer details.
Admin: Oversees the entire application.

Views lists of all market laborers, market yards, users, and market vendors.
Has access to all data about laborers and produce details.

Notes:
Feature Flow
Market admin registers the market.
Market vendor registers under a market and requests approval from the market admin.
Once approved, the market vendor can add laborers and produce details to the market.
It is mandatory to assign a laborer to each produce entry by the market vendor.
The relationship is maintained between laborers and produce added by market vendors, and all vendors are managed by the market admin.
