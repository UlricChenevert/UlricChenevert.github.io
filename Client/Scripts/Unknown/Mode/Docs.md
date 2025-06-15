# Architecture

This contains the rendering procedures. There are several layer classes, each one dedicated to a specific case, like rendering a background or animating bullets. Note that it does not tell what to render; someone else must combine these layers to create a scene.

Rules: it must either set mode, bubble to command, and/or bubble to layer

![ Structure ](../../Docs/Basic%20Game%20Architecture.png)