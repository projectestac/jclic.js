
JClicPlayer Startup process
===========================

1 - Initializing
----------------
JClicPlayer constructor - JClicPlayer.setSkin - Skin.doLayout - JClicPlayer.doLayout

Loading project and activity
----------------------------
JClicPlayer.load - Activity.Panel.buildVisualComponents *s*  
JClicPlayer.load - JClicPlayer.doLayout - Activity.Panel.fitTo - (Activity.Panel.setDimension *s* + Activity.Panel.setBounds *s*)  
JClicPlayer.load - JClicPlayer.initActivity - Activity.Panel.initActivity - JClicPlayer.startActivity - Activity.Panel.startActivity  

2 - Activity running
--------------------

3 - Passing to next activity
----------------------------
Action.processEvent - PlayerHistory.processJump - PlayerHistory. jumpToSequence ->  
JClicPlayer.load - Activity.Panel.buildVisualComponents (_on the new activity_)  
JClicPlayer.load - Activity.Panel.end (_removes current Activity.Panel_)  
JClicPlayer.load - JClicPlayer.doLayout - Activity.Panel.fitTo - (Activity.Panel.setDimension *s* + Activity.Panel.setBounds *s*)  
JClicPlayer.load - JClicPlayer.initActivity - Activity.Panel.initActivity - JClicPlayer.startActivity - Activity.Panel.startActivity  

4 - Activity running
--------------------

