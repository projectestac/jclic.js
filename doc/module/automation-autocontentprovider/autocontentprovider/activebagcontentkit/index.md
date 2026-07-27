---
title: ActiveBagContentKit
kind: class
longname: module:automation/AutoContentProvider.AutoContentProvider.ActiveBagContentKit
description: Utility class used to encapsulate multiple sets of box contents
---

# ActiveBagContentKit

<SourceLink href="/source/automation/autocontentprovider-js/#L160" label="AutoContentProvider.js:160" />

Utility class used to encapsulate multiple sets of box contents

---

## Constructor

<Signature
  code="new ActiveBagContentKit(
	nRows: number,
	nCols: number,
	content: Array.<module:boxes/ActiveBagContent.ActiveBagContent>,
	useIds: boolean,
): ActiveBagContentKit"
/>

**Parameters**

- `nRows` (number) — Number of rows to be processed
- `nCols` (number) — Number of columns to be processed
- `content` (Array.\<[module:boxes/ActiveBagContent.ActiveBagContent](/module/boxes-activebagcontent#activebagcontent)>) — Array with one or more containers of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)\
  objects to be filled with new content.
- `useIds` (boolean) — `true` when the `id` field of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) objects is significant.
