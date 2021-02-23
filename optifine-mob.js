Not implemented MCPatcher features:

Connected textures
- innerSeams
- renderpass

Custom Items
- method
- cap
- fade

Random Mobs
- redcow_overlay
- snowman_overlay

Other
- line.properties
- renderpass.properties
- compass.properties

###############################################################################
# Sample configuration for texture properties
# Location: /assets/minecraft/optifine/texture.properties
###############################################################################

# Format
# Texture format used for normal and specular shader textures
# LabPbr: https://github.com/rre36/lab-pbr/wiki
# See "shaders.txt", Standard Macros, Textures
format=lab-pbr/1.3

==================================
System properties used by OptiFine
==================================

The system properties have to be added in the field "JVM Arguments" in the launcher profile.
For example to enable extended logging add "-Dlog.detail=true" to the JVM arguments.

# Enable extended logging 
log.detail=<true|false>

# Save the final texture map in the folder "debug"
saveTextureMap=<true|false>

# Save the final shader sources in the folder "shaderpacks/debug"
shaders.debug.save=<true|false>

# Automatically animate all mob models
# Useful when testing custom entity models
animate.model.living=<true|false>

# Load the player models from the folder "playermodels"
player.models.local=<true|false>

# Automatically reload the player models every 5 sec.
# Useful when testing a custom local player model 
player.models.reload=<true|false>

# Show frame time (ms) instead of FPS
frame.time=<true|false>

# OpenGL debug groups
gl.debug.groups=<true|false>

# Ignore OpenGL errors
# <ids> - comma separated list of error ids
gl.ignore.errors=<ids>
###############################################################################
# Sample configuration for OptiFine's Custom Sky feature.
# Based on the configuration for MCPatcher's Better Skies mod.
#
###############################################################################
# sky.properties
###############################################################################
#
# All property names are case-sensitive.
# Properties that specify a path to a texture file can use any of the following
# syntax:
# Relative to assets/minecraft:
#   path/filename -> assets/minecraft/path/filename
# Relative to assets/minecraft/optifine:
#   ~/path/filename -> assets/minecraft/optifine/filename
# Relative to location of properties file:
#   ./path/filename -> (path of properties file)/path/filename
# Absolute path with namespace:
#   namespace:path/filename -> assets/namespace/path/filename
#
# Place the file at
#   ~/sky/world0/sky0.properties
#   ~/sky/world0/sky1.properties
#   ... etc.
# in your texture pack.  Each file represents one layer of the sky.  OptiFine
# will continue loading them until a .properties file is not found.  The order
# is the order in which they will be rendered in game.
#
# Additionally, two special properties files are applied to the sun and moon if
# present.  This is mainly intended to allow you to override the blend method
# used by the sun and moon.
#   ~/sky/world0/sun.properties  (replaces sun.png)
#   ~/sky/world0/moon_phases.properties (replaces moon_phases.png)
# Instead of a full skybox, the source texture should match the layout of
# sun.png or moon_phases.png.
#
# NOTE: The "world0" in the path refers to the overworld.  If there were other
# worlds with skies (the Nether and End do not use the standard sky rendering
# methods), their files would be in ~/sky/world<world number>.
###############################################################################

###############################################################################
# Sky properties
###############################################################################

# (Optional) Name of source texture.  This can be anywhere in your texture pack
# and multiple properties files can share the same source.  If not specified,
# sky<n>.png in the same directory is used.
source=<texture>

# (Required) Fade in/out times.  All times are in hh:mm 24-hour format.  For
# reference,
#   Sunrise  =  6:00 = /time set 0
#   Noon     = 12:00 = /time set 6000
#   Sunset   = 18:00 = /time set 12000
#   Midnight =  0:00 = /time set 18000
# The fade times control the brightness when blending.
#   between startFadeIn and endFadeIn:   0 up to 1
#   between endFadeIn and startFadeOut:  always 1
#   between startFadeOut and endFadeOut: 1 down to 0
#   between endFadeOut and startFadeIn:  always 0
# Note that you do not need to specify startFadeOut; its value is uniquely
# determined by the other three.
startFadeIn=<hh:mm>
endFadeIn=<hh:mm>
endFadeOut=<hh:mm>

# (Optional) Blending method.  Here "previous layer" can refer to the default
# sky or to the previous custom sky defined by sky<n-1>.properties.  Supported
# blending methods are
#   add:      Add this sky bitmap to the previous layer.
#   subtract:
#   multiply: Multiply the previous RGBA values by the RGBA values in the
#             current bitmap.
#   dodge:
#   burn:
#   screen:
#   replace:  Replace the previous layer entirely with the current bitmap.
#             There is no gradual fading with this method; if brightness
#             computed from the fade times is > 0, the full pixel value is
#             used.
#   overlay:  RGB value > 0.5 brightens the image, < 0.5 darkens.
#   alpha:    Weighted average by alpha value.
# The default method is add.
blend=add

# (Optional) Rotation.  Whether or not the bitmap should rotate with the time
# of day.  The default is true.  The speed and direction of rotation can also
# be controlled.
rotate=true

# (Optional) Rotation speed as a multiple of the default of one 360-degree
# cycle per game day.  A value of 0.5 rotates every two days.  Irrational
# values can be useful to make clouds appear in different positions each day,
# for example.
# NOTE:  This does not affect the fading in and out which always occurs on a
# 24-hour cycle.
speed=1.0

# (Optional) Axis of rotation.  If a player is looking in the given direction,
# the skybox will appear to be rotating clockwise around the line of sight.
# Default rotation is along the southern axis (rising in the east and setting
# in the west).
# For reference, the vectors corresponding to the six cardinal directions are
# below.  However, the rotation axis can be any vector except 0 0 0.
# Normalization is not required.
#   down  =  0 -1  0
#   up    =  0  1  0
#   north =  0  0 -1
#   south =  0  0  1
#   west  = -1  0  0
#   east  =  1  0  0
axis=0.0 0.0 1.0

# (Optional) Weather
# Weather for which the layer is to be rendered
# Several values can be specified separated by space 
# for example "weather=clear rain thunder"
# Default is "clear"
weather=clear|rain|thunder

# (Optional) Biome and height
# Limit the sky layer to only certain biomes or height ranges.
# The vanilla biome names are listed here: https://minecraft.gamepedia.com/Biome#Biome_IDs
# Biomes added by mods can also be used.
biomes=<biome list>
heights=<height ranges>

# (Optional) Transition
# Transition time (sec) for the layer brightness.
# It is used to smooth sharp transitions, for example between different biomes.
# Default is 1 sec. 
transition=1

Overview
========
The Shaders Mod makes use of a deferred rendering pipeline.
The gbuffer shaders come first in the pipeline. They render data to textures that will be sent to the composite shaders. 
Optional composite shaders can be added after the shadow map (shadowcomp), before terrain (prepare) and before water rendering (deferred).
The composite shaders then render to textures that will be sent to the final shader. 
The final shader renders directly to the screen.

Shader Files
============
All shader files are placed in the folder "shaders" of the shader pack.
The shader source files use the name of the program in which they are to be used with extension depending on their type.

Extension  Type                 
==========================
.vsh       Vertex shader     
.gsh       Geometry shader   
.fsh       Fragment shader   

Geometry shaders need either OpenGL 3.2 with layout qualifiers or the extension GL_ARB_geometry_shader4 with configuration "maxVerticesOut".

Color Attachments
=================
The data is passed from shader to shader using color attachments. 
There are at least 4 for all machines. For machines that can support it, there are up to 16.
MacOS is limited to 8 color attachments, even with modern GPUs.
In the deferred, composite and final shaders, these are referenced by the gcolor, gdepth, gnormal, composite, gaux1, gaux2, gaux3 and gaux4 uniforms.
(colortex0 to colortexF can be used instead of gcolor, gdepth etc.)
Despite the naming, all of these color attachments are the same and can be used for any purpose with the exception of the first two. 
The first one, gcolor has its color cleared to the current fog color before rendering. 
The second one, gdepth has its color cleared to solid white before rendering and uses a higher precision storage buffer suitable for storing depth values. 
The rest have their color cleared to black with 0 alpha.

Each color attachment uses 2 buffers (A and B) with logical names "main" and "alt", which can be used as ping-pong buffers.
When the buffers are flipped the mapping between main/alt and A/B is reversed.
Gbuffer programs always read from "main" (only gaux1-4) and write to "main" buffers (they shouldn't read and write to the same buffer at the same time).
Deferred/composite programs always read from "main" and write to "alt" buffers. 
After a deferred/composite program is rendered the buffers that it writes to are flipped so the next programs can see the current output as input.
The property "flip.<program>.<buffer>=<true|false>" can be used to enable or disable the flip independant of the buffer write.
The virtual programs "deferred_pre" and "composite_pre" can be used for buffer flipping before the deferred/composite pass.

Output color attachments are configured with the "/* DRAWBUFFERS:XYZ */" comment, placed in the fragment shader.
Gbuffers, deferred and composite programs can write to any color attachment, but no more than 8 at the same time.
If the output color attachments are not configured, then the program will write to the first 8 color attachments.  

When writing to the color attachments in the composite shader, blending is disabled. 
Writing to color attachments that the composite shader also reads from will generate artifacts (unless you just copy the original contents) 

The vertex and fragment configuration parsing is affected by the preprocessor conditional compilation directives.
The following preprocessor directives are currently recognized:
  #define <macro>
  #undef <macro>
  #ifdef <macro>
  #ifndef <macro>
  #if <int>
  #if defined <macro>
  #if !defined <macro>
  #elif <int>
  #elif defined <macro> 
  #elif !defined <macro>
  #else
  #endif

The current shaderpack can be reloaded by pressing "F3+R" or using the command "/reloadShaders". 

Shader Programs
===============
Name                         Render                                When not defined use
========================================================================================
<none>                       gui, menus                            <none>
--- Shadow map ---
shadow                       everything in shadow pass             <none>  
shadow_solid                 <not used>                            shadow
shadow_cutout                <not used>                            shadow
--- Shadow composite ---
shadowcomp                   <shadowcomp>                          <none>
shadowcomp1                  <shadowcomp>                          <none>
...
shadowcomp15                 <shadowcomp>                          <none>
--- Prepare ---
prepare                      <prepare>                             <none>
prepare1                     <prepare>                             <none>
...
prepare15                    <prepare>                             <none>
--- GBuffers ---
gbuffers_basic               leash, block selection box            <none>
gbuffers_textured            particles                             gbuffers_basic
gbuffers_textured_lit        lit_particles, world border           gbuffers_textured
gbuffers_skybasic            sky, horizon, stars, void             gbuffers_basic
gbuffers_skytextured         sun, moon                             gbuffers_textured
gbuffers_clouds              clouds                                gbuffers_textured
gbuffers_terrain             solid, cutout, cutout_mip             gbuffers_textured_lit
gbuffers_terrain_solid       <not used>                            gbuffers_terrain
gbuffers_terrain_cutout_mip  <not used>                            gbuffers_terrain
gbuffers_terrain_cutout      <not used>                            gbuffers_terrain
gbuffers_damagedblock        damaged_blocks                        gbuffers_terrain
gbuffers_block               block_entities                        gbuffers_terrain
gbuffers_beaconbeam          beacon beam                           gbuffers_textured
gbuffers_item                <not used>                            gbuffers_textured_lit
gbuffers_entities            entities                              gbuffers_textured_lit
gbuffers_entities_glowing    glowing entities, spectral effect     gbuffers_entities
gbuffers_armor_glint         glint on armor and handheld items     gbuffers_textured
gbuffers_spidereyes          eyes of spider, enderman and dragon   gbuffers_textured
gbuffers_hand                hand and opaque handheld objects      gbuffers_textured_lit
gbuffers_weather             rain, snow                            gbuffers_textured_lit
--- Deferred ---
deferred_pre                 <virtual> flip ping-pong buffers      <none>
deferred                     <deferred>                            <none>
deferred1                    <deferred>                            <none>
...
deferred15                   <deferred>                            <none>
--- GBuffers translucent ---
gbuffers_water               translucent                           gbuffers_terrain
gbuffers_hand_water          translucent handheld objects          gbuffers_hand
--- Composite ---
composite_pre                <virtual> flip ping-pong buffers      <none>
composite                    <composite>                           <none>
composite1                   <composite>                           <none>
...
composite15                  <composite>                           <none>
--- Final ---
final                        <final>                               <none>

Remarks:
 - The programs shadow_solid, shadow_cutout, gbuffers_terrain_solid, gbuffers_terrain_cutout and gbuffers_terrain_cutout_mip are not used

Todo:
 - Separate programs for world border, entities (by id, by type), cape, elytra, wolf collar, etc. 
 
Attributes
==========
Source                                          Value                                             Comment
=====================================================================================================================================================================
attribute vec3 mc_Entity;                       xy = blockId, renderType                          "blockId" is used only for blocks specified in "block.properties"      
attribute vec2 mc_midTexCoord;                  st = midTexU, midTexV                             Sprite middle UV coordinates                
attribute vec4 at_tangent;                      xyz = tangent vector, w = handedness

Uniforms
==========
Source                                          Value                                                    
=====================================================================================================================================================================
uniform int heldItemId;                         held item ID (main hand), used only for items defined in "item.properties"
uniform int heldBlockLightValue;                held item light value (main hand)
uniform int heldItemId2;                        held item ID (off hand), used only for items defined in "item.properties"
uniform int heldBlockLightValue2;               held item light value (off hand)
uniform int fogMode;                            GL_LINEAR, GL_EXP or GL_EXP2
uniform float fogDensity;                       0.0-1.0
uniform vec3 fogColor;                          r, g, b
uniform vec3 skyColor;                          r, g, b
uniform int worldTime;                          <ticks> = worldTicks % 24000
uniform int worldDay;                           <days> = worldTicks / 24000
uniform int moonPhase;                          0-7
uniform int frameCounter;                       Frame index (0 to 720719, then resets to 0)
uniform float frameTime;                        last frame time, seconds
uniform float frameTimeCounter;                 run time, seconds (resets to 0 after 3600s)
uniform float sunAngle;                         0.0-1.0
uniform float shadowAngle;                      0.0-1.0
uniform float rainStrength;                     0.0-1.0
uniform float aspectRatio;                      viewWidth / viewHeight
uniform float viewWidth;                        viewWidth
uniform float viewHeight;                       viewHeight
uniform float near;                             near viewing plane distance
uniform float far;                              far viewing plane distance
uniform vec3 sunPosition;                       sun position in eye space
uniform vec3 moonPosition;                      moon position in eye space
uniform vec3 shadowLightPosition;               shadow light (sun or moon) position in eye space
uniform vec3 upPosition;                        direction up
uniform vec3 cameraPosition;                    camera position in world space
uniform vec3 previousCameraPosition;            last frame cameraPosition
uniform mat4 gbufferModelView;                  modelview matrix after setting up the camera transformations
uniform mat4 gbufferModelViewInverse;           inverse gbufferModelView
uniform mat4 gbufferPreviousModelView;          last frame gbufferModelView
uniform mat4 gbufferProjection;                 projection matrix when the gbuffers were generated
uniform mat4 gbufferProjectionInverse;          inverse gbufferProjection
uniform mat4 gbufferPreviousProjection;         last frame gbufferProjection
uniform mat4 shadowProjection;                  projection matrix when the shadow map was generated
uniform mat4 shadowProjectionInverse;           inverse shadowProjection
uniform mat4 shadowModelView;                   modelview matrix when the shadow map was generated
uniform mat4 shadowModelViewInverse;            inverse shadowModelView
uniform float wetness;                          rainStrength smoothed with wetnessHalfLife or drynessHalfLife
uniform float eyeAltitude;                      view entity Y position
uniform ivec2 eyeBrightness;                    x = block brightness, y = sky brightness, light 0-15 = brightness 0-240 
uniform ivec2 eyeBrightnessSmooth;              eyeBrightness smoothed with eyeBrightnessHalflife
uniform ivec2 terrainTextureSize;               not used
uniform int terrainIconSize;                    not used
uniform int isEyeInWater;                       1 = camera is in water, 2 = camera is in lava
uniform float nightVision;                      night vision (0.0-1.0)
uniform float blindness;                        blindness (0.0-1.0)
uniform float screenBrightness;                 screen brightness (0.0-1.0)
uniform int hideGUI;                            GUI is hidden
uniform float centerDepthSmooth;                centerDepth smoothed with centerDepthSmoothHalflife
uniform ivec2 atlasSize;                        texture atlas size (only set when the atlas texture is bound)
uniform vec4 spriteBounds;                      sprite bounds in the texture atlas (u0, v0, u1, v1), set when MC_ANISOTROPIC_FILTERING is enabled
uniform vec4 entityColor;                       entity color multiplier (entity hurt, creeper flashing when exploding)
uniform int entityId;                           entity ID
uniform int blockEntityId;                      block entity ID (block ID for the tile entity, only for blocks specified in "block.properties")
uniform ivec4 blendFunc;                        blend function (srcRGB, dstRGB, srcAlpha, dstAlpha)
uniform int instanceId;                         instance ID when instancing is enabled (countInstances > 1), 0 = original, 1-N = copies
uniform float playerMood;                       player mood (0.0-1.0), increases the longer a player stays underground

GBuffers Uniforms
================= 
Programs: basic, textured, textured_lit, skybasic, skytextured, clouds, terrain, terrain_solid, terrain_cutout_mip, terrain_cutout, damagedblock, water, block, beaconbeam, item, entities, armor_glint, spidereyes, hand, hand_water, weather)
==================
Source                                          Value                                                    
=====================================================================================================================================================================
uniform sampler2D texture;                      0
uniform sampler2D lightmap;                     1
uniform sampler2D normals;                      2         
uniform sampler2D specular;                     3
uniform sampler2D shadow;                       waterShadowEnabled ? 5 : 4
uniform sampler2D watershadow;                  4
uniform sampler2D shadowtex0;                   4
uniform sampler2D shadowtex1;                   5
uniform sampler2D depthtex0;                    6
uniform sampler2D gaux1;                        7  <custom texture or output from deferred programs>
uniform sampler2D gaux2;                        8  <custom texture or output from deferred programs>
uniform sampler2D gaux3;                        9  <custom texture or output from deferred programs>
uniform sampler2D gaux4;                        10 <custom texture or output from deferred programs>
uniform sampler2D colortex4;                    7  <custom texture or output from deferred programs>
uniform sampler2D colortex5;                    8  <custom texture or output from deferred programs>
uniform sampler2D colortex6;                    9  <custom texture or output from deferred programs>
uniform sampler2D colortex7;                    10 <custom texture or output from deferred programs>
uniform sampler2D colortex8;                    16 <custom texture or output from deferred programs>
uniform sampler2D colortex9;                    17 <custom texture or output from deferred programs>
uniform sampler2D colortexA;                    18 <custom texture or output from deferred programs>
uniform sampler2D colortexB;                    19 <custom texture or output from deferred programs>
uniform sampler2D colortexC;                    20 <custom texture or output from deferred programs>
uniform sampler2D colortexD;                    21 <custom texture or output from deferred programs>
uniform sampler2D colortexE;                    22 <custom texture or output from deferred programs>
uniform sampler2D colortexF;                    23 <custom texture or output from deferred programs>
uniform sampler2D depthtex1;                    11
uniform sampler2D shadowcolor;                  13
uniform sampler2D shadowcolor0;                 13
uniform sampler2D shadowcolor1;                 14
uniform sampler2D noisetex;                     15

Shadow Uniforms
==================
Programs: shadow, shadow_solid, shadow_cutout 
==================
Source                                          Value                                                    
=====================================================================================================================================================================
uniform sampler2D tex;                          0
uniform sampler2D texture;                      0
uniform sampler2D lightmap;                     1
uniform sampler2D normals;                      2         
uniform sampler2D specular;                     3
uniform sampler2D shadow;                       waterShadowEnabled ? 5 : 4
uniform sampler2D watershadow;                  4
uniform sampler2D shadowtex0;                   4
uniform sampler2D shadowtex1;                   5
uniform sampler2D gaux1;                        7  <custom texture>
uniform sampler2D gaux2;                        8  <custom texture>
uniform sampler2D gaux3;                        9  <custom texture>
uniform sampler2D gaux4;                        10 <custom texture>
uniform sampler2D colortex4;                    7  <custom texture>
uniform sampler2D colortex5;                    8  <custom texture>
uniform sampler2D colortex6;                    9  <custom texture>
uniform sampler2D colortex7;                    10 <custom texture>
uniform sampler2D colortex8;                    16 <custom texture>
uniform sampler2D colortex9;                    17 <custom texture>
uniform sampler2D colortexA;                    18 <custom texture>
uniform sampler2D colortexB;                    19 <custom texture>
uniform sampler2D colortexC;                    20 <custom texture>
uniform sampler2D colortexD;                    21 <custom texture>
uniform sampler2D colortexE;                    22 <custom texture>
uniform sampler2D colortexF;                    23 <custom texture>
uniform sampler2D shadowcolor;                  13
uniform sampler2D shadowcolor0;                 13
uniform sampler2D shadowcolor1;                 14
uniform sampler2D noisetex;                     15

Composite and Deferred Uniforms
===============================
Programs: composite, composite1, composite2, composite3, composite4, composite5, composite6, composite7, final, deferred, deferred1, deferred2, deferred3, deferred4, deferred5, deferred6, deferred7
===============================
Source                                          Value                                                    
=====================================================================================================================================================================
uniform sampler2D gcolor;                       0
uniform sampler2D gdepth;                       1
uniform sampler2D gnormal;                      2
uniform sampler2D composite;                    3
uniform sampler2D gaux1;                        7
uniform sampler2D gaux2;                        8
uniform sampler2D gaux3;                        9
uniform sampler2D gaux4;                        10
uniform sampler2D colortex0;                    0
uniform sampler2D colortex1;                    1
uniform sampler2D colortex2;                    2
uniform sampler2D colortex3;                    3
uniform sampler2D colortex4;                    7
uniform sampler2D colortex5;                    8
uniform sampler2D colortex6;                    9
uniform sampler2D colortex7;                    10
uniform sampler2D colortex8;                    16 
uniform sampler2D colortex9;                    17 
uniform sampler2D colortexA;                    18 
uniform sampler2D colortexB;                    19 
uniform sampler2D colortexC;                    20 
uniform sampler2D colortexD;                    21 
uniform sampler2D colortexE;                    22 
uniform sampler2D colortexF;                    23 
uniform sampler2D shadow;                       waterShadowEnabled ? 5 : 4
uniform sampler2D watershadow;                  4
uniform sampler2D shadowtex0;                   4
uniform sampler2D shadowtex1;                   5
uniform sampler2D gdepthtex;                    6
uniform sampler2D depthtex0;                    6
uniform sampler2D depthtex1;                    11
uniform sampler2D depthtex2;                    12
uniform sampler2D shadowcolor;                  13
uniform sampler2D shadowcolor0;                 13
uniform sampler2D shadowcolor1;                 14
uniform sampler2D noisetex;                     15

GBuffers Textures
=================
Id Name           Legacy name
======================================
0  texture
1  lightmap
2  normals
3  specular
4  shadowtex0     shadow, watershadow 
5  shadowtex1     shadow (when watershadow used)
6  depthtex0
7  gaux1          colortex4 <custom texture or output from deferred programs>
8  gaux2          colortex5 <custom texture or output from deferred programs>
9  gaux3          colortex6 <custom texture or output from deferred programs>
10 gaux4          colortex7 <custom texture or output from deferred programs>
12 depthtex1
13 shadowcolor0   shadowcolor 
14 shadowcolor1
15 noisetex
16 colortex8      <custom texture or output from deferred programs>
17 colortex9      <custom texture or output from deferred programs>
18 colortexA      <custom texture or output from deferred programs>
19 colortexB      <custom texture or output from deferred programs>
20 colortexC      <custom texture or output from deferred programs>
21 colortexD      <custom texture or output from deferred programs>
22 colortexE      <custom texture or output from deferred programs>
23 colortexF      <custom texture or output from deferred programs>

Shadow Textures
==================
Id Name           Legacy name
======================================
0  texture        tex
1  lightmap
2  normals
3  specular
4  shadowtex0     shadow, watershadow        
5  shadowtex1     shadow (when watershadow used)
7  gaux1          colortex4 <custom texture>
8  gaux2          colortex5 <custom texture>
9  gaux3          colortex6 <custom texture>
10 gaux4          colortex7 <custom texture>
13 shadowcolor0   shadowcolor
14 shadowcolor1   
15 noisetex
16 colortex8      <custom texture>
17 colortex9      <custom texture>
18 colortexA      <custom texture>
19 colortexB      <custom texture>
20 colortexC      <custom texture>
21 colortexD      <custom texture>
22 colortexE      <custom texture>
23 colortexF      <custom texture>

Composite and Deferred Textures
===============================
Id Name           Legacy name
======================================
0  colortex0      gcolor 
1  colortex1      gdepth 
2  colortex2      gnormal 
3  colortex3      composite
4  shadowtex0     shadow, watershadow 
5  shadowtex1     shadow (when watershadow used)
6  depthtex0      gdepthtex
7  colortex4      gaux1
8  colortex5      gaux2
9  colortex6      gaux3
10 colortex7      gaux4
11 depthtex1
12 depthtex2
13 shadowcolor0   shadowcolor
14 shadowcolor1
15 noisetex
16 colortex8
17 colortex9
18 colortexA
19 colortexB
20 colortexC
21 colortexD
22 colortexE
23 colortexF

Depth buffers usage
===================
Name        Usage
==============================================================================
depthtex0   everything
depthtex1   no translucent objects (water, stained glass) 
depthtex2   no translucent objects (water, stained glass), no handheld objects

Shadow buffers usage
====================
Name        Usage
==============================================================================
shadowtex0  everything
shadowtex1  no translucent objects (water, stained glass) 

Vertex Shader Configuration
===========================
Source                                          Effect                                                    Comment
=====================================================================================================================================================================
attribute <type> mc_Entity;                     useEntityAttrib = true
attribute <type> mc_midTexCoord;                useMidTexCoordAttrib = true             
attribute <type> at_tangent;                    useTangentAttrib = true
const int countInstances = 1;                   when "countInstances > 1" the geometry will be rendered several times, see uniform "instanceId"

Geometry Shader Configuration
===========================
Source                                          Effect                                                    Comment
=====================================================================================================================================================================
#extension GL_ARB_geometry_shader4 : enable     Enable GL_ARB_geometry_shader4
const int maxVerticesOut = 3;                   Set GEOMETRY_VERTICES_OUT_ARB for GL_ARB_geometry_shader4 

Fragment Shader Configuration
=============================
Source                                          Effect                                                     Comment
=====================================================================================================================================================================
uniform <type> shadow;                          shadowDepthBuffers = 1
uniform <type> watershadow;                     shadowDepthBuffers = 2
uniform <type> shadowtex0;                      shadowDepthBuffers = 1
uniform <type> shadowtex1;                      shadowDepthBuffers = 2
uniform <type> shadowcolor;                     shadowColorBuffers = 1
uniform <type> shadowcolor0;                    shadowColorBuffers = 1
uniform <type> shadowcolor1;                    shadowColorBuffers = 2
uniform <type> depthtex0;                       depthBuffers = 1
uniform <type> depthtex1;                       depthBuffers = 2
uniform <type> depthtex2;                       depthBuffers = 3
uniform <type> gdepth;                          if (bufferFormat[1] == RGBA) bufferFormat[1] = RGBA32F;
uniform <type> gaux1;                           colorBuffers = 5
uniform <type> gaux2;                           colorBuffers = 6
uniform <type> gaux3;                           colorBuffers = 7
uniform <type> gaux4;                           colorBuffers = 8
uniform <type> colortex4;                       colorBuffers = 5
uniform <type> colortex5;                       colorBuffers = 6
uniform <type> colortex6;                       colorBuffers = 7
uniform <type> colortex7;                       colorBuffers = 8
uniform <type> centerDepthSmooth;               centerDepthSmooth = true
/* SHADOWRES:1024 */                            shadowMapWidth = shadowMapHeight = 1024
const int shadowMapResolution = 1024;           shadowMapWidth = shadowMapHeight = 1024
/* SHADOWFOV:90.0 */                            shadowMapFov = 90
const float shadowMapFov = 90.0;                shadowMapFov = 90
/* SHADOWHPL:160.0 */                           shadowMapDistance = 160.0
const float shadowDistance = 160.0f;            shadowMapDistance = 160.0
const float shadowDistanceRenderMul = -1f;      shadowDistanceRenderMul = -1                               When > 0 enable shadow optimization (shadowRenderDistance = shadowDistance * shadowDistanceRenderMul)
const float shadowIntervalSize = 2.0f;          shadowIntervalSize = 2.0
const bool generateShadowMipmap = true;         shadowMipmap = true
const bool generateShadowColorMipmap = true;    shadowColorMipmap = true
const bool shadowHardwareFiltering = true;      shadowHardwareFiltering = true
const bool shadowHardwareFiltering0 = true;     shadowHardwareFiltering[0] = true
const bool shadowHardwareFiltering1 = true;     shadowHardwareFiltering[1] = true
const bool shadowtexMipmap = true;              shadowMipmap[0] = true
const bool shadowtex0Mipmap = true;             shadowMipmap[0] = true
const bool shadowtex1Mipmap = true;             shadowMipmap[1] = true
const bool shadowcolor0Mipmap = true;           shadowColorMipmap[0] = true
const bool shadowColor0Mipmap = true;           shadowColorMipmap[0] = true
const bool shadowcolor1Mipmap = true;           shadowColorMipmap[1] = true
const bool shadowColor1Mipmap = true;           shadowColorMipmap[1] = true
const bool shadowtexNearest = true;             shadowFilterNearest[0] = true
const bool shadowtex0Nearest = true;            shadowFilterNearest[0] = true
const bool shadow0MinMagNearest = true;         shadowFilterNearest[0] = true
const bool shadowtex1Nearest = true;            shadowFilterNearest[1] = true
const bool shadow1MinMagNearest = true;         shadowFilterNearest[1] = true
const bool shadowcolor0Nearest = true;          shadowColorFilterNearest[0] = true
const bool shadowColor0Nearest = true;          shadowColorFilterNearest[0] = true
const bool shadowColor0MinMagNearest = true;    shadowColorFilterNearest[0] = true
const bool shadowcolor1Nearest = true;          shadowColorFilterNearest[1] = true
const bool shadowColor1Nearest = true;          shadowColorFilterNearest[1] = true
const bool shadowColor1MinMagNearest = true;    shadowColorFilterNearest[1] = true
/* WETNESSHL:600.0 */                           wetnessHalfLife = 600 (ticks)
const float wetnessHalflife = 600.0f;           wetnessHalfLife = 600 (ticks)
/* DRYNESSHL:200.0 */                           drynessHalfLife = 200 (ticks)
const float drynessHalflife = 200.0f;           drynessHalfLife = 200 (ticks)
const float eyeBrightnessHalflife = 10.0f;      eyeBrightnessHalflife = 10 (ticks)
const float centerDepthHalflife = 1.0f;         centerDepthSmoothHalflife = 1 (ticks)
const float sunPathRotation = 0f;               sunPathRotation = 0f
const float ambientOcclusionLevel = 1.0f;       ambientOcclusionLevel = 1.0f                               0.0f = AO disabled, 1.0f = vanilla AO
const int superSamplingLevel = 1;               superSamplingLevel = 1
const int noiseTextureResolution = 256;         noiseTextureResolution = 256
/* GAUX4FORMAT:RGBA32F */                       buffersFormat[7] = GL_RGBA32F
/* GAUX4FORMAT:RGB32F */                        buffersFormat[7] = GL_RGB32F
/* GAUX4FORMAT:RGB16 */                         buffersFormat[7] = GL_RGB16
const int <bufferIndex>Format = <format>;       bufferFormats[index] = <format>                            See "Draw Buffer Index" and "Texture Formats"
const bool <bufferIndex>Clear = false;          gbuffersClear[index] = false                               Skip glClear() for the given buffer, only for "composite" and "deferred" programs 
const vec4 <bufferIndex>ClearColor = vec4();    gbuffersClearColor[index] = vec4(r, g, b, a)               Clear color for the given buffer, only for "composite" and "deferred" programs 
const bool <bufferIndex>MipmapEnabled = true;   bufferMipmaps[index] = true                                Only for programs "composite" , "deferred" and "final"
const int <shadowBufferIx>Format = <format>;    shadowBufferFormats[index] = <format>                      See "Shadow Buffer Index" and "Texture Formats"
const bool <shadowBufferIx>Clear = false;       shadowBuffersClear[index] = false                          Skip glClear() for the given shadow color buffer 
const vec4 <shadowBufferIx>ClearColor = vec4(); shadowBuffersClearColor[index] = vec4(r, g, b, a)          Clear color for the given shadow color buffer
/* DRAWBUFFERS:02BF */                          drawBuffers = "02BF"                                       Draw buffers 0, 2, B and F

Draw Buffer Index
=================
Prefix                  Index
==================================
colortex<0-F>           0-F
gcolor                  0
gdepth                  1
gnormal                 2
composite               3
gaux1                   4
gaux2                   5
gaux3                   6
gaux4                   7

Shadow Buffer Index
===================
Prefix                  Index
==================================
shadowcolor             0
shadowcolor<0-1>        0-1
 
Texture Formats
===============
1. 8-bit
 Normalized         Signed normalized  Integer            Unsigned integer
 =================  =================  =================  =================
 R8                 R8_SNORM           R8I                R8I
 RG8                RG8_SNORM          RG8I               RG8I
 RGB8               RGB8_SNORM         RGB8I              RGB8I
 RGBA8              RGBA8_SNORM        RGBA8I             RGBA8I
2. 16-bit
 Normalized         Signed normalized  Float              Integer            Unsigned integer
 =================  =================  =================  =================  =================
 R16                R16_SNORM          R16F               R16I               R16UI    
 RG16               RG16_SNORM         RG16F              RG16I              RG16UI   
 RGB16              RGB16_SNORM        RGB16F             RGB16I             RGB16UI  
 RGBA16             RGBA16_SNORM       RGBA16F            RGBA16I            RGBA16UI 
3. 32-bit
 Float              Integer            Unsigned integer
 =================  =================  =================
 R32F               R32I               R32UI
 RG32F              RG32I              RG32UI
 RGB32F             RGB32I             RGB32UI
 RGBA32F            RGBA32I            RGBA32UI
4. Mixed
 R3_G3_B2
 RGB5_A1
 RGB10_A2
 R11F_G11F_B10F
 RGB9_E5

Pixel Formats
=============
1. Normalized
 RED
 RG
 RGB
 BGR
 RGBA
 BGRA
2. Integer
 RED_INTEGER
 RG_INTEGER
 RGB_INTEGER
 BGR_INTEGER
 RGBA_INTEGER
 BGRA_INTEGER

Pixel Types
===========
 BYTE
 SHORT
 INT
 HALF_FLOAT
 FLOAT
 UNSIGNED_BYTE
 UNSIGNED_BYTE_3_3_2
 UNSIGNED_BYTE_2_3_3_REV
 UNSIGNED_SHORT
 UNSIGNED_SHORT_5_6_5
 UNSIGNED_SHORT_5_6_5_REV
 UNSIGNED_SHORT_4_4_4_4
 UNSIGNED_SHORT_4_4_4_4_REV
 UNSIGNED_SHORT_5_5_5_1
 UNSIGNED_SHORT_1_5_5_5_REV
 UNSIGNED_INT
 UNSIGNED_INT_8_8_8_8
 UNSIGNED_INT_8_8_8_8_REV
 UNSIGNED_INT_10_10_10_2
 UNSIGNED_INT_2_10_10_10_REV

Block ID mapping
================
The block ID mapping is defined in "shaders/block.properties" included in the shader pack.
Forge mods may add custom block mapping as "assets/<modid>/shaders/block.properties" in the mod JAR file.
The "block.properties" file can use conditional preprocessor directives (#ifdef, #if, etc.)
For more details see section "Standard Macros" A to G. Option macros are not available.
Format "block.<id>=<block1> <block2> ..."
The key is the substitute block ID, the values are the blocks which are to be replaced.
Only one line per block ID is allowed.
See "properties_files.txt" for the block matching rules.

  # Short format
  block.31=red_flower yellow_flower reeds
  # Long format
  block.32=minecraft:red_flower ic2:nether_flower botania:reeds
  # Properties
  block.33=minecraft:red_flower:type=white_tulip minecraft:red_flower:type=pink_tulip botania:reeds:type=green

See "properties.files" for more details.

Block render layers
===================
The custom block render layers are defined in "shaders/block.properties" included in the shader pack.

  layer.solid=<blocks>
  layer.cutout=<blocks>
  layer.cutout_mipped=<blocks>
  layer.translucent=<blocks>

Layers
  solid - no alpha, no blending (solid textures)
  cutout - alpha, no blending (cutout textures)
  cutout_mipped - alpha, no blending, mipmaps (cutout with mipmaps)
  translucent - alpha, blending, mipmaps (water, stained glass)
 
Blocks which are solid opaque cubes (stone, dirt, ores, etc) can't be rendered on a custom layer
as this would affect face culling, ambient occlusion, light propagation and so on.

For exaple:
  layer.translucent=glass_pane fence wooden_door

Item ID mapping
================
The item ID mapping is defined in "shaders/item.properties" included in the shader pack.
Forge mods may add custom item mapping as "assets/<modid>/shaders/item.properties" in the mod JAR file.
The "item.properties" file can use conditional preprocessor directives (#ifdef, #if, etc.)
For more details see section "Standard Macros" A to G. Option macros are not available.
Format "item.<id>=<item1> <item2> ..."
The key is the substitute item ID, the values are the items which are to be replaced.
Only one line per item ID is allowed.

  # Short format
  item.5000=diamond_sword dirt
  # Long format
  item.5001=minecraft:diamond_sword botania:reeds

Entity ID mapping
=================
The entity ID mapping is defined in "shaders/entity.properties" included in the shader pack.
Forge mods may add custom entity mapping as "assets/<modid>/shaders/entity.properties" in the mod JAR file.
The "entity.properties" file can use conditional preprocessor directives (#ifdef, #if, etc.)
For more details see section "Standard Macros" A to G. Option macros are not available.
Format "entity.<id>=<entity1> <entity2> ..."
The key is the substitute entity ID, the values are the entities which are to be replaced.
Only one line per entity ID is allowed.

  # Short format
  entity.2000=sheep cow
  # Long format
  entity.2001=minecraft:pig botania:pixie

Standard Macros
===============
The standard macros are automatically included after the "#version" declaration in every shader file

A. Minecraft version
 #define MC_VERSION <value>
 The value is in format 122 (major 1, minor 2, release 2)
 For example: 1.9.4 -> 10904, 1.11.2 -> 11102, etc.

B. Maximum supported GL version
 #define MC_GL_VERSION <value>
 The value is integer, for example: 210, 320, 450

C. Maximum supported GLSL version
 #define MC_GLSL_VERSION <value>
 The value is integer, for example: 120, 150, 450

D. Operating system 
 One of the following:
  #define MC_OS_WINDOWS
  #define MC_OS_MAC
  #define MC_OS_LINUX
  #define MC_OS_OTHER

E. GPU
 One of the following:
  #define MC_GL_VENDOR_AMD
  #define MC_GL_VENDOR_ATI
  #define MC_GL_VENDOR_INTEL
  #define MC_GL_VENDOR_NVIDIA
  #define MC_GL_VENDOR_XORG
  #define MC_GL_VENDOR_OTHER

F. Driver
 One of the following:
  #define MC_GL_RENDERER_RADEON 
  #define MC_GL_RENDERER_GEFORCE
  #define MC_GL_RENDERER_QUADRO
  #define MC_GL_RENDERER_INTEL
  #define MC_GL_RENDERER_GALLIUM
  #define MC_GL_RENDERER_MESA
  #define MC_GL_RENDERER_OTHER

G. OpenGL extensions
 Macros for the supported OpenGL extensions are named like the corresponding extension with a prefix "MC_".
 For example the macro "MC_GL_ARB_shader_texture_lod" is defined when the extension "GL_ARB_shader_texture_lod" is supported.
 Only the macros which are referenced and supported are added to the shader file.

H. Options
 #define MC_FXAA_LEVEL <value>             // When FXAA is enabled, values: 2, 4
 #define MC_NORMAL_MAP                     // When the normal map is enabled
 #define MC_SPECULAR_MAP                   // When the specular map is enabled
 #define MC_RENDER_QUALITY <value>         // Values: 0.5, 0.70710677, 1.0, 1.4142135, 2.0
 #define MC_SHADOW_QUALITY <value>         // Values: 0.5, 0.70710677, 1.0, 1.4142135, 2.0
 #define MC_HAND_DEPTH <value>             // Values: 0.0625, 0.125, 0.25
 #define MC_OLD_HAND_LIGHT                 // When Old Hand Light is enabled
 #define MC_OLD_LIGHTING                   // When Old Lighting is enabled
 #define MC_ANISOTROPIC_FILTERING <value>  // When anisotropic filtering is enabled

I. Textures 
 #define MC_TEXTURE_FORMAT_LAB_PBR       // Texture format LabPBR (https://github.com/rre36/lab-pbr/wiki)
 #define MC_TEXTURE_FORMAT_LAB_PBR_1_3   // Version 1.3
 (see "texture.properties")

References
==========
 http://daxnitro.wikia.com/wiki/Editing_Shaders_%28Shaders2%29
 http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1286604-shaders-mod-updated-by-karyonix
 http://www.minecraftforum.net/forums/search?by-author=karyonix&display-type=posts
 http://www.seas.upenn.edu/~cis565/fbo.htm#feedback

###############################################################################
# Sample configuration for OptiFine's Shaders feature.
#
###############################################################################
# shaders.properties
###############################################################################
# Place this file in the "shaders" folder of the shader pack
# 
# This file can use conditional preprocessor directives (#ifdef, #if, etc.)
# For more details see "shaders.txt", section "Standard Macros" A to G.
# Option macros are not available.
#
# Set clouds type or turn clouds off
# The clouds are also controlled by "Video Settings -> Details -> Clouds" with higher priority
clouds=fast|fancy|off

# Enable or disable old hand light 
# Backwards compatibility for shader packs not supporting main and off hand.
# When enabled uses the handheld item with higher light value for the main hand.  
# The old hand light is also controlled by "Video Settings -> Shaders -> Old Hand Light" with higher priority
oldHandLight=true|false

# Enable or disable the dynamic hand light from "Dynamic Lights"
# This option can be used to disable the dynamic hand light from "Dynamic Lights" if the shader implements its own hand light.
dynamicHandLight=true|false

# Enable or disable old block lighting with fixed multiplier
# The old block lighting is also controlled by "Video Settings -> Shaders -> Old Lighting" with higher priority
oldLighting=true|false

# Enable or disable rendering of translucent blocks (water, stained glass) in the shadow pass
shadowTranslucent=true|false

# Enable or disable underwater screen overlay
underwaterOverlay=true|false

# Enable or disable sun rendering
sun=true|false

# Enable or disable moon rendering
moon=true|false

# Enable or disable vignette rendering
vignette=true|false

# Enable back-face rendering per render layer
# Default is false
backFace.solid=true|false 
backFace.cutout=true|false
backFace.cutoutMipped=true|false
backFace.translucent=true|false

# Rain depth
# Enables rain and snow to write to the depth buffer
rain.depth=true|false

# Beacon beam depth
# Enables beacon beam to write to the depth buffer
beacon.beam.depth=true|false

# Separate AO
# When enabled the AO brightness (smooth lighting) is separated from "color.rbg" and put in "color.a". 
separateAo=true|false

# Frustum culling
# Enable or disable frustum culling
frustum.culling=true|false

# OptiFine version
# The minimum OptiFine version which is required by the shader pack
# Each Minecraft version has to be specified separately.
# For example:
#   version.1.12.2=D1
#   version.1.10.2=F1
#   version.1.8=J1
version.<mc_ver>=<of_edition>

# Custom textures
# Allows custom textures to be bound to the available shader units.
# Format:
#  texture.<stage>.<name>=<path>
# Stage:
#  gbuffers - gbuffers and shadow programs
#  deferred - deferred programs
#  composite - composite and final programs
# Name is the texture unit name, see "shaders.txt" for the available names.
# The textures can be loaded from different places:
# 1. Shader pack 
#   The texture path is relative to the folder "shaders".
#   Example:
#     texture.composite.colortex1=textures/noise.png
# 2. Resource pack
#   The texture path should start with "minecraft:"
#   Example
#     texture.composite.colortex2=minecraft:textures/font/ascii.png
# 3. Dynamic (lightmap, texture atlas)
#   Example
#     texture.composite.colortex3=minecraft:dynamic/lightmap_1
#     texture.composite.colortex4=minecraft:textures/atlas/blocks.png
# The suffix "_n" and "_s" can be used to load the normal/specular variant of the texture,
# for example "minecraft:textures/atlas/blocks_n.png"
# 
# Raw textures (binary dump) can also be loaded:
#   texture.<stage>.<name>=<path> <type> <internalFormat> <dimensions> <pixelFormat> <pixelType>
# Where:
#   <type> is one of: TEXTURE_1D, TEXTURE_2D, TEXTURE_3D, TEXTURE_RECTANGLE
#   <internalFormat> is the texture format, see Texture Formats in "shaders.txt" for the available names
#   <dimensions> is a list of texture dimensions, depends on the texture type
#   <pixelFormat> is the pixel format, see Pixel Formats in "shaders.txt" for the available names
#   <pixelType> is the pixel type, see Pixel Types in "shaders.txt" for the available names
# For example: 
#   texture.composite.gaux1=textures/lut_1d.dat TEXTURE_1D RGBA32F 256 RGBA FLOAT
#   texture.composite.gaux1.2=textures/lut_3d.dat TEXTURE_3D RGBA32F 64 64 64 RGBA FLOAT
# It is possible to bind several textures with different types to one texture unit.
# The shaders can differentiate between them based on the sampler type: sampler1d, sampler2d, sampler3d ...
# In one program only one sampler type can be used per texture unit.
# The suffixes ".0" to ".9" can be added to <name> to avoid duplicate property keys.
# Wrap and filter modes can be configured by adding standard texture ".mcmeta" files, 
# for example: "textures/lut_3d.dat.mcmeta"
texture.<stage>.<name>=<path>

# Custom noise texture
# Allows the noise texture to be loaded from the shader pack
texture.noise=<path>

# Shader options are parsed from the ".fsh" and ".vsh" files located in the folder "shaders".
# The line comment located after the option is shown as a tooltip.
# Tooltip lines are split on sentence end ". ".
# Tooltip lines ending with "!" are automatically shown red.
# One option can be present in several shader files and it will be switched simultaneously in all of them.
# Ambiguous options (different default values found) are disabled and can not be changed.
# Left click on an option button selects the next value, right click selects the previous value and 
# Shift + click resets the option to default value.
#
# Boolean, default ON
#   #define SSAO       // Screen space ambient occlusion. High performance impact.
# Boolean, default OFF
#   // #define SSAO    // Screen space ambient occlusion. High performance impact.
#
# The boolean variables are recognized only if the matching "#ifdef" or "#ifndef" is also found in the same file. 
#
# Variable
#   #define SHADOW_DARKNESS 0.10   // Shadow darkness levels [0.05 0.10 0.20]
#
# The allowed values are given as a list "[v1 v2 v3]" in the comment.
# The default value is automatically added if not present in the list.
#
# Some "const" variables are also recognized (backwards compatibility with the Shaders Mod).
# They use a structure similar to the macro variables, for example: 
#   const int shadowMapResolution = 1572; // Shadowmap resolution [1024 1572 2048]
#   const float shadowDistance = 64.0;    // Draw distance of shadows [32.0 64.0 128.0 256.0]
#
# Const variables without allowed values are by default not visible, unless used in a profile or configured on a screen.
#
# The recognized "const" variables are:
#   shadowMapResolution
#   shadowDistance
#   shadowDistanceRenderMul
#   shadowIntervalSize
#   generateShadowMipmap
#   generateShadowColorMipmap
#   shadowHardwareFiltering
#   shadowHardwareFiltering0
#   shadowHardwareFiltering1
#   shadowtex0Mipmap
#   shadowtexMipmap
#   shadowtex1Mipmap
#   shadowcolor0Mipmap
#   shadowColor0Mipmap
#   shadowcolor1Mipmap
#   shadowColor1Mipmap
#   shadowtex0Nearest
#   shadowtexNearest
#   shadow0MinMagNearest
#   shadowtex1Nearest
#   shadow1MinMagNearest
#   shadowcolor0Nearest
#   shadowColor0Nearest
#   shadowColor0MinMagNearest
#   shadowcolor1Nearest
#   shadowColor1Nearest
#   shadowColor1MinMagNearest
#   wetnessHalflife
#   drynessHalflife
#   eyeBrightnessHalflife
#   centerDepthHalflife
#   sunPathRotation
#   ambientOcclusionLevel
#   superSamplingLevel
#   noiseTextureResolution
#
# User friendly option labels can be loaded from language files in "/shaders/lang"
# Example from "/shaders/lang/en_us.lang":
#   option.SHADOW_FILTER=Shadow Filter
#   option.SHADOW_FILTER.comment=Smooth out edges of shadows. Very small performance hit.
#
# User friendly value labels can be loaded from language files in "/shaders/lang"
# Example from "/shaders/lang/en_us.lang"
#   value.SHADOW_FILTER.0.4f=Normal
#   value.SHADOW_FILTER.0.9f=Soft
#
# Value formatting can be added with:
#   prefix.SHADOW_FILTER=(
#   suffix.SHADOW_FILTER=)
#
# Profile tooltips can be loaded from language files in "/shaders/lang"
# Example from "/shaders/lang/en_us.lang":
#   profile.comment=Low - low. Medium - medium. Standard - standard. High - high. Ultra - ultra.

# Sliders
# Options with multiple allowed values can be shown as sliders
sliders=<list of options>
 
# Profiles allow a set of options to be switched together
# The current profile is detected based on the selected option values
# If no profile matches the current option values, the profile "Custom" is selected
# It is recommended that all profiles use the same list of options and only the values differ
# Disabled programs are special options and only disabling (prefix !) is recognized for them 
profile.NAME=<list of options>

# Profile options
#   OPTION:value  - set value
#   OPTION=value  - set value
#   OPTION        - set boolean option ON
#   !OPTION       - set boolean option OFF
#   profile.NAME  - copy all options from another profile
#   !program.name - disable program "name". The program name may include dimension: "world-1/gbuffers_water"
#
# The following program names are recognized:
#   gbuffers_basic
#   gbuffers_textured
#   gbuffers_textured_lit
#   gbuffers_skybasic
#   gbuffers_skytextured
#   gbuffers_clouds
#   gbuffers_terrain
#   gbuffers_terrain_solid
#   gbuffers_terrain_cutout_mip
#   gbuffers_terrain_cutout
#   gbuffers_damagedblock
#   gbuffers_water
#   gbuffers_block
#   gbuffers_beaconbeam
#   gbuffers_item
#   gbuffers_entities
#   gbuffers_armor_glint
#   gbuffers_spidereyes
#   gbuffers_hand
#   gbuffers_weather
#   composite
#   composite1
#   composite2
#   composite3
#   composite4
#   composite5
#   composite6
#   composite7
#   final
#   shadow
#   shadow_solid
#   shadow_cutout
#   deferred
#   deferred1
#   deferred2
#   deferred3
#   deferred4
#   deferred5
#   deferred6
#   deferred7
#   gbuffers_hand_water
#
# Examples
# profile.LOW=SSAO:false GOD_RAYS:false SHADOW_DIST:40 !program.composite1
# profile.MED=profile.LOW GOD_RAYS SHADOW_DIST:80
# profile.HIGH=SSAO GOD_RAYS SHADOW_DIST:120 
# 
# User friendly profile labels can be loaded from language files in "/shaders/lang"
# Example from "/shaders/lang/en_us.lang"
# profile.LOW=Low
# profile.LOW.comment=Low quality. Intel and Mac compatible. No God Rays and SSAO.
# profile.MED=Medium
# profile.MED.comment=Medium quality. Nvidia or AMD graphics card recommended.
# profile.HIGH=High
# profile.HIGH.comment=High quality. Modern Nvidia or AMD graphics card required.

# Option screen configuration
# Main screen
screen=<list of options>
# Sub-screen
screen.NAME=<list of options>

# Screen options
#   OPTION    - option name
#   [NAME]    - link to sub-screen NAME
#   <profile> - profile selection
#   <empty>   - empty slot
#   *         - the rest of the options not configured on any of the screens

# Option columns per screen
# By default the options are shown in two columns:
#   1  2
#   3  4
#   5  6
#   ...
# When more than 18 options are present the screen switches to 3 or more columns.
# The option names are automatically shortened to avoid text overflow outside the button.
#
# Main screen
screen.columns=2
# Sub-screen
screen.NAME.columns=2

# Example:
# screen=<profile> <empty> BLOOM CELLSHADING [SUN_EFFECTS] [WAVING_GRASS]
# screen.SUN_EFFECTS=SUN_EFFECTS GOD_RAYS LENS_FLARE RAINDROPS
# screen.WAVING_GRASS=WAVING_GRASS WAVING_LEAVES WAVING_VINES
# screen.MISC=*
#
# User friendly screen labels can be loaded from language files in "/shaders/lang"
# Example from "/shaders/lang/en_us.lang"
# screen.DOF=Depth of field
# screen.DOF.comment=Depth of field effect. Adds blur to out of focus objects.
# screen.WAVING=Waving grass and leaves
# screen.WAVING.comment=Waving grass, leaves, fire and entities

# Custom uniforms
# Define custom variables and uniforms using general mathematical expressions with brackets, 
# constants, variables, operators and functions.
# The uniforms are sent to the shaders, the variables can be used in other variables or uniforms.
# The custom uniforms are updated on program change.
# 
# Constants
#   floating point number
#   pi - 3.1415926
#   true
#   false
#
# The available biome ids, categories and precipitation types are defines as constants. 
# For example: BIOME_PLAINS, BIOME_DESERT, BIOME_EXTREME_HILLS, etc. 
#
# Parameters (float)
#   biome                - biome id
#   biome_category       - 0 to 16 (CAT_NONE, CAT_TAIGA, CAT_EXTREME_HILLS, CAT_JUNGLE, CAT_MESA, CAT_PLAINS, CAT_SAVANNA, CAT_ICY, 
#                          CAT_THE_END, CAT_BEACH, CAT_FOREST, CAT_OCEAN, CAT_DESERT, CAT_RIVER, CAT_SWAMP, CAT_MUSHROOM, CAT_NETHER)
#   biome_precipitation  - 0 to 2 (PPT_NONE, PPT_RAIN, PPT_SNOW)
#   temperature          - 0.0 to 1.0
#   rainfall             - 0.0 to 1.0 (humidity)
#
# Rain/snow is rendered for "biome_precipitation != PPT_NONE". If "temperature >= 0.15" rain is rendered, otherwise snow. 
#
# The fixed scalar uniforms are also available as parameters. For example: heldItemId, worldTime, moonPhase, etc.
# Vector elements can be accessed with suffix ".x", ".y" and ".z". For example: "sunPosition.y". 
# Color elements can be accessed with suffix ".r", ".g" and ".b". For example: "skyColor.r".
# Matrix elements can be accessed by row and column index. For example "gbufferModelView.0.1".
#
# The dynamic uniforms entityColor, entityId, blockEntityId, fogMode and fogColor can not be used as parameters 
# as they may change many times per program. 
#
# Parameters (boolean)
#   is_alive
#   is_burning
#   is_child
#   is_glowing
#   is_hurt
#   is_in_lava
#   is_in_water
#   is_invisible
#   is_on_ground
#   is_ridden
#   is_riding
#   is_sneaking
#   is_sprinting
#   is_wet
#
# Operators
#   +, -, *, /, %
#   !, &&, || 
#   >, >=, <, <=, ==, !=
#
# Functions
#   sin(x)
#   cos(x)
#   asin(x)
#   acos(x)
#   tan(x)
#   atan(x)
#   atan2(y, x)
#   torad(deg)
#   todeg(rad)
#   min(x, y ,...)
#   max(x, y, ...)
#   clamp(x, min, max)                             Limits a value to be between min and max values
#   abs(x)
#   floor(x)
#   ceil(x)
#   exp(x)
#   frac(x)
#   log(x)
#   pow(x)
#   random()
#   round(x)
#   signum(x)
#   sqrt(x)
#   fmod(x, y)                                     Similar to Math.floorMod()
#   if(cond, val, [cond2, val2, ...], val_else)    Select a value based one or more conditions
#   smooth([id], val, [fadeInTime, [fadeOutTime]]) Smooths a variable with custom fade-in time. 
#                                                  The "id" must be unique, if not specified it is generated automatically  
#                                                  Default fade time is 1 sec.
# Boolean functions                 
#   between(x, min, max)                           Check if a value is between min and max values
#   equals(x, y, epsilon)                          Compare two float values with error margin
#   in(x, val1, val2, ...)                         Check if a value equals one of several values
#
# Vector functions
#   vec2(x, y)
#   vec3(x, y, z) 
#   vec4(x, y, z, w)
#
# Example:
#   variable.bool.isBiomeDark=in(biome, BIOME_RIVER, BIOME_FOREST)
#   variable.float.valBiomeDark=smooth(1, if(isBiomeDark, 1, 0), 5)
#   variable.float.valHurtDark=smooth(2, if(is_hurt, 1.3, 0), 0, 10)
#   variable.float.valSwordDark=smooth(3, if(heldItemId == 276, 1, 0), 0.5, 0.5)
#   uniform.float.screenDark=max(valBiomeDark, valHurtDark, valSwordDark)
#   uniform.vec3.screenDark3=vec3(screenDark, heldItemId, biome)
#
uniform.<float|int|bool|vec2|vec3|vec4>.<name>=<expression>
variable.<float|int|bool|vec2|vec3|vec4>.<name>=<expression>

# Alpha test
# The alpha test can be configured per program.
# Where 
#  - func is one of: NEVER, LESS, EQUAL, LEQUAL, GREATER, NOTEQUAL, GEQUAL, GL_ALWAYS
#  - ref - float value
alphaTest.<program>=<off|func ref>

# Blend mode
# The blend mode can be configured per program.
# Where src, dst, srcA and dstA are one of: ZERO, ONE, SRC_COLOR, ONE_MINUS_SRC_COLOR, DST_COLOR, ONE_MINUS_DST_COLOR, 
# SRC_ALPHA, ONE_MINUS_SRC_ALPHA, DST_ALPHA, ONE_MINUS_DST_ALPHA, SRC_ALPHA_SATURATE
blend.<program>=<off|src dst srcA dstA>

# Blend mode per buffer
# The blend mode can be configured per program and buffer
# Where src, dst, srcA and dstA are one of: ZERO, ONE, SRC_COLOR, ONE_MINUS_SRC_COLOR, DST_COLOR, ONE_MINUS_DST_COLOR, 
# SRC_ALPHA, ONE_MINUS_SRC_ALPHA, DST_ALPHA, ONE_MINUS_DST_ALPHA, SRC_ALPHA_SATURATE
blend.<program>.<buffer>=<off|src dst srcA dstA>

# Composite render scale
# Defines a custom viewport to be used when rendering composite and deferred programs.
# The scale, offsetX and offsetY should be between 0.0 and 1.0.
scale.<program>=<scale|scale offsetX ofsetY>

# Ping-pong buffer flip
# Enable or disable ping-pong buffer flip for a specific buffer name in a specific composite or deferred program.
# When buffer flip is disabled the next composite program will use the same input and output buffers for this buffer name.
# The last program that writes to the buffer should have flip enabled so that the following programs can read from the buffer.
# This can be used with composite render scale to allow several composite programs to write to different regions in the same buffer.
# Forced buffer flip can be used to read from both ping-pong buffers.
flip.<program>.<buffer>=<true|false>

# Buffer size
# Define custom fixed size for a specific buffer.
# Only prepare, deferred and composite programs can render to fixed size buffers.
# Rendering to fixed size and normal buffers at the same time is not possible.
# When rendering to several fixed size buffers all of them must have the same size.
size.buffer.<buffer>=width height

# Enable or disable programs depending on shader options
# Disabled progams are processed as not defined and instead their fallback programs will be used.
# The program name can contain dimension folder, for example:
#   program.world-1/composite2.enabled=BLOOM
# The expression is a boolean expression which can use shader options of type switch (on/off), for example:
#   program.composite.enabled=(BLOOM || SSAO) && !GODRAYS
program.<program>.enabled=<expression>

# Shaders can be separated by world dimension by placing them in folder "/shaders/world<id>" where "id" is the world dimension.
# When the world folder is present the shaders will be loaded only from there ignoring the default folder.
# Creating an empty world folder effectively disables the shaders for this world dimension.
# Mod world dimensions should also work.
# Only ".vsh" and ".fsh" files are loaded from the dimension folder.
# Example
#   /shaders         - default shaders
#   /shaders/world-1 - nether shaders
#   /shaders/world1  - end shaders
#
# Dimension folders are also scanned for options.
# The options in dimension foldes may be given different names to avoid conflict with default values.

# The "#include" directive found in ".vsh" and ".fsh" files is replaced with the contents of the included file
# Relative, look in same folder
#   #include "const.inc"
# Absolute, start from base folder "/shaders"
#   #include "/world-55/lib.inc"
# 
# Included files may include other files.
# The maximum include depth is limited to 10.
#
# To avoid code duplication on nested includes the following can be used:
#   // File A
#   #ifndef INCLUDE_A
#   #define INCLUDE_A
#   ... <code>
#   #endif
# 
# When Minecraft is started with argument "-Dshaders.debug.save=true" then the final shaders will be saved in "shaderpacks/debug".
# Update to 1.13
## Resource packs
* Rename folder "assets/minecraft/mcpatcher" to "assets/minecraft/optifine"
* In all ".properties" files replace references to "assets/minecraft/mcpatcher" with "assets/minecraft/optifine"
* Replace all numeric IDs (blocks, items, enchantments, etc.) with [names](https://minecraft.gamepedia.com/1.13/Flattening)
## Shader packs
* Add mappings for all numeric IDs used in the shader ([blocks](https://github.com/sp614x/optifine/blob/master/OptiFineDoc/doc/shaders.txt#L487), [items](https://github.com/sp614x/optifine/blob/master/OptiFineDoc/doc/shaders.txt#L528), [entities](https://github.com/sp614x/optifine/blob/master/OptiFineDoc/doc/shaders.txt#L543), etc.)

###############################################################################
# Sample configuration for OptiFine's Random Entities feature.
# Based on the configuration for MCPatcher's Random Mobs mod.
###############################################################################
# This file is offered without any copyright restrictions. 
# Please copy and modify it to suit your needs.  
#
# Random Entites is backwards compatible with Random Mobs. The textures and 
# configurations in "assets/minecraft/optifine/mob" are also supported.
#
# You can place this file in the "optifine/random" folder of your resource pack, 
# parallel to the vanilla texture in "textures":
#
# Primary (vanilla) texture:
#   assets/minecraft/textures/entity/creeper/creeper.png
# Alts:
#   assets/minecraft/optifine/random/entity/creeper/creeper2.png
#   assets/minecraft/optifine/random/entity/creeper/creeper3.png
#   assets/minecraft/optifine/random/entity/creeper/creeper4.png
#   etc.
# Properties (optional):
#   assets/minecraft/optifine/random/entity/creeper/creeper.properties
#
# Primary (vanilla) texture:
#   assets/minecraft/textures/painting/paintings_kristoffer_zetterstrand.png
# Alts:
#   assets/minecraft/optifine/random/painting/paintings_kristoffer_zetterstrand2.png
#   assets/minecraft/optifine/random/painting/paintings_kristoffer_zetterstrand3.png
#   assets/minecraft/optifine/random/painting/paintings_kristoffer_zetterstrand4.png
#   etc.
# Properties (optional):
#   assets/minecraft/optifine/random/painting/paintings_kristoffer_zetterstrand.properties
#
# This file consists of a sequence of rules, numbered from 1.
#  
# Each rule specifies a range of entity textures to use and one or more conditions
# under which to use them.  
#
# The entity coordinates when it spawns (single player) or when it is first
# seen by the client (multiplayer) are checked against each rule in sequence. 
# The first rule that matches wins. If no rule matches, the default texture
# (e.g. creeper.png) is used.
#
# If no ".properties" file is present for an entity, then all available textures are
# used for that type of entity.
#
# Entites with multiple textures will use the ".properties" file for the base
# texture. In other words, you do not need to create
#   wolf.properties
#   wolf_tame.properties
#   wolf_angry.properties
# Just wolf.properties will work for all three, provided you have the same
# number of textures for each. Similarly for "_eyes" and "_overlay".
#
# All property names are case-sensitive.
# All paths are relative to assets/minecraft unless otherwise stated.
###############################################################################

###############################################################################
# Rule format.
# <n> starts at 1.
###############################################################################

# (Required) Range of entity textures to use.
# The texture index "1" is the default texture from "assets/minecraft/texture".
textures.<n>=<list of texture indices>
# Alternatively the Random Mobs property "skins.<n>" can be used.
# skins.<n>=<list of skins>

# (Optional) List of weights to apply to the random choice
# Weights do not have to total 100 or any other particular value.
# The number of weights should match the number of textures 
weights.<n>=<same-size list of weights>

# (Optional) List of biomes
# The vanilla biome names are listed here: https://minecraft.gamepedia.com/Biome#Biome_IDs
# Biomes added by mods can also be used.
biomes.<n>=<biome list>

# (Optional) Height ranges
# Replaces legacy minHeight and maxHeight properties.
heights.<n>=<height ranges>

# (Optional) Entity name
# Uses syntax similar to the Custom Item Textures NBT tags. 
# A value starting with "!" performs a negative match (not).
# Examples:
#  - Match string: "name=Pinky"
#  - Match special formatting: "name=\u00a74\u00a7oPinky"  
#    (for best compatibility, use the escape sequence '\u00a7' instead of "�")
#  - Wildcards using "?" and "*": "name=pattern:Pinky*"
#  - Wildcards, case insensitive: "name=ipattern:Pinky*"
#  - Java regular expressions: "name=regex:Pin(k)+y"
#    (see http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html)
#  - Java regular expressions, case insensitive: "name=iregex:Pin(k)+y"
# Any backslashes in the match string must be doubled.  
# Literal backslashes within a regular expression or wildcard must be quadrupled.
# Correct:
#   name=regex:\\d+
#   name=regex:\\\\
#   name=/\\/\\
# Wrong:
#   name=regex:\d+
#   name=regex:\\
#   name=/\/\
name.<n>=<name>

# Professions (optional)
# List of villager professions with optional levels
#
# Entry format
#   <profession>[:level1,level2,...]
#
# Professions: none, armorer, butcher, cartographer, cleric, farmer, fisherman, fletcher, 
#              leatherworker, librarian, mason, nitwit, shepherd, toolsmith, weaponsmith 
#
# Example:
#   # Professions farmer (all levels) or librarian (levels 1,3,4)
#   professions=farmer librarian:1,3-4
#   # Professions full
#   professions=minecraft:fisherman minecraft:shepherd minecraft:nitwit
professions.<n>=<professions>

# Collar colors (optional)
# List of wolf/cat collar colors
#
# Colors: white orange magenta light_blue yellow lime pink gray light_gray cyan purple blue brown green red black
#
# Example:
#   colarColors=pink magenta purple
collarColors.<n>=<colors>

# Baby (optional)
# Only valid for mobs
baby.<n>=<true/false>

# Health (optional)
# Range of health values, can also be given in percent.
# Only valid for mobs.
# Example:
#   health.1=10
#   health.2=5-8 10-12
#   health.3=0-50%
health.<n>=<list>

# Moon phase (Optional)
# List of moon phases (0-7)
# Example
#   moonPhase.1=3
#   moonPhase.2=0 1 2
#   moonPhase.1=0-2 4-7
moonPhase.<n>=<list>

# Day time (Optional)
# List of day times in ticks (0-24000)
# Example
#   dayTime.1=2000-10000
#   dayTime.2=0-1000 18000-24000
dayTime.<n>=<list>

# Weather (Optional)
# Several values can be specified separated by space 
# for example "weather=clear rain thunder"
weather.<n>=<clear|rain|thunder>

###############################################################################
# Examples:
# creeper/creeper.properties:
###############################################################################
# Use creeper10.png through creeper14.png for all underground creepers.
# creeper13.png will be used 7.3% (3/(10+10+10+3+10)) of the time.
skins.1=10-14
weights.1=10 10 10 3 10
heights.1=0-55

# Use 5, 7, 9 in high, hilly areas.
skins.2=5 7 9
biomes.2=ExtremeHills DesertHills ForestHills ExtremeHillsEdge JungleHills IceMountains
heights.2=80-255

# Fallback rule if nothing else matches.  Remember, if no rule matches, only
# the base creeeper/creeper.png will be used.
skins.3=1-4 6 8 15-20

=============================================================
Description of OptiFine's configuration properties files
Based on McPatcher's configuration files
=============================================================

Overview
========

Many OptiFine features use properties files to control how textures within your texture pack are used. 
Properties files are simple text files similar to the Windows ".ini" format. Each line is a property, specified as name=value.

  # Sample comment
  property1=value
  property2=some_other_value
  
  # Blank lines are allowed
  property3=yet_another_value

All property names are case-sensitive "renderpass" is not the same as "renderPass". The order of properties within the file 
does not matter. Many properties have default values and can be omitted, and in some cases the entire properties file is optional. 
See the sections for each properties file for details.

Certain types of objects are used within properties files by different OptiFine features. 
Rather than describe these common types separately in each feature section, they are summarized here instead.

Textures
========

Often, OptiFine requires you to specify a path to an image file or some other resource within your texture pack. 
This is simply the path to the texture within the zip file. The folder structure within a texture pack can get deeply nested, 
so OptiFine has some shortcuts to make things easier. Whenever OptiFine calls for you to provide a texture file, 
any of these options can be used to specify the path.

The most straightforward method is simply a path relative to assets/minecraft:

  # Full path
  texture=textures/entity/creeper/creeper.png

This refers to "assets/minecraft/textures/entity/creeper/creeper.png" within the zip file or folder of your texture pack. 
Always use forward slashes "/" to separate folder names. Regardless of your OS, do not use backslashes "\" 
or the game will not properly recognize the path.

An optional "namespace" prefix can be added. This example refers to exactly the same "creeper.png" file as above:

  # Full path with namespace
  texture=minecraft:textures/entity/creeper/creeper.png

For textures used by other mods, the namespace will often be something other than "minecraft":
  
  # Full path with mod namespace
  texture=herobrine:textures/entity/him.png

This refers to "assets/herobrine/textures/entity/him.png", not to "assets/minecraft/textures/entity/him.png".

Many textures specific to OptiFine are in the "assets/minecraft/optifine" folder. 
Since it is used so frequently, it can be represented by the tilde "~" character. The following refer to the same file:

  # Relative to "assets/minecraft/optifine"
  texture=~/dial/clock0.png
  texture=minecraft:optifine/dial/clock0.png

Textures can also be specified relative to the path of the properties file that refers to them. 
For example, within "~/dial/clock.properties" (remember "~" = "assets/minecraft/optifine")

  # Relative path: Bare filename with no slashes
  texture=clock0.png
  # Relative path: Using "./" to denote the current directory
  texture=./clock0.png
  # Absolute path: Using "~"
  texture=~/dial/clock0.png
  # Absolute path: Without namespace
  texture=optifine/dial/clock0.png
  # Absolute path: With namespace
  texture=minecraft:optifine/dial/clock0.png

all refer to the same path, "assets/minecraft/optifine/dial/clock0.png". If the properties file were in another location, 
say ~/misc, then relative paths would be based on that folder instead, but absolute paths would still refer to the dial directory.

In general, try to organize your textures with the properties files that go with them. 
Your paths will be shorter and easier to maintain when you move things around.

Blocks
======

Since 1.7 Minecraft can reference blocks by ID. 
Since 1.13 the numeric blocks IDs are removed and only block names can be used. 

The block IDs continue to exist within the game internally, but can no longer be specified in the configuration files as they are unstable. 
For example the stone block used to be ID 1 but is now called "minecraft:stone". As with textures, the "minecraft:" prefix is optional, 
so just "stone" will also work. Mods will probably use a namespace other than "minecraft" so the prefix will be required there.

See the Dinnerbone's list of Block and Item IDs with names: http://media.dinnerbone.com/uploads/2013-09/files/28_00-44-23_YfmAkomVI.txt

In 1.13 many variant blocks were "flattened" to several simple blocks and the block metadata was removed.
See https://minecraft.gamepedia.com/1.13/Flattening 

The block name format is "<namespace:>name<:property1=value1,...:property2=value1,...>". 
Optional parts are in angle brackets "<>". Default namespace is "minecraft".

  # Short name
  blocks=oak_stairs
    
  # Full name
  blocks=minecraft:oak_stairs
  
  # Mod blocks require full names
  blocks=botania:crate

  # Properties
  blocks=minecraft:oak_stairs:facing=east,west:half=bottom

The "minecraft:" prefix is optional, this can also be written as:

  # Properties
  blocks=oak_stairs:facing=east,west:half=bottom

Items
=====

Since 1.7 items can also be specified by name. 
See Dinnerbone's list of Block and Item IDs with names: http://dinnerbone.com/media/uploads/2013-09/files/28_00-44-23_YfmAkomVI.txt

Since 1.13 items can only be specified by name.
See: https://minecraft.gamepedia.com/1.13/Flattening  

Again, the "minecraft:" prefix is optional.

Biomes
======

For features that call for a list of biomes, use the names from the Minecraft wiki: https://minecraft.gamepedia.com/Biome#Biome_IDs
Biomes added by mods can also be used.

  # Biomes short
  biomes=ocean deep_ocean river beach
  # Biomes full
  biomes=minecraft:ocean biomesoplenty:highland
  
Since 1.13 many biomes have been renamed.
See: https://minecraft.gamepedia.com/1.13/Flattening  

Blending methods
================

When two or more textures are combined, OptiFine offers several options for specifying the blending operation.

Valid blending methods are described below. "This" or "current" texture refers to the texture currently being applied. "Previous" refers to whatever has been rendered so far, which could be a single texture or the result of an earlier blending operation.
- replace: Replace the previous layer entirely with the current bitmap. No blending and only simple on/off transparency.
- alpha: Blend the two textures using this texture's alpha value. This is the most common type of blending.
- overlay: RGB value > 0.5 brightens the previous image, < 0.5 darkens. color is a synonym for this method.
- add: Add this texture's RGB values multiplied by alpha to the previous layer.
- subtract: Subtract this texture's RGB values from the previous layer.
- multiply: Multiply the previous RGB values by this texture's RGB values
- dodge: Add this texture's RGB values to the previous layer.
- burn: New RGB = (1 - current RGB) * previous RGB
- screen: New RGB = 1 - (1 - current RGB) * (1 - previous RGB)

See Blend modes on Wikipedia for some illustrations: https://en.wikipedia.org/wiki/Blend_modes

Number lists
============

Occasionally you will need to specify a list of numbers. OptiFine understands ranges and individual values:

  # Single entry.
  list=1
  # Multiple values listed separately.
  list=1 2 3
  # Same values using ranges.
  list=1-3
  # Multiple ranges.
  list=1-3 6 8 10-15
  # Open-ended ranges
  damage=100-

RGB colors
==========

Color values are specified in hexadecimal RGB format:

  # White
  color=ffffff
  # Black
  color=000000
  # Red
  color=ff0000
  # Green
  color=00ff00
  # Blue
  color=0000ff

References
==========
https://bitbucket.org/prupe/mcpatcher/wiki/About_Properties_Files
http://dinnerbone.com/media/uploads/2013-09/files/28_00-44-23_YfmAkomVI.txt
http://www.minecraftforum.net/forums/mapping-and-modding/resource-packs/1226351-1?comment=11315
http://www.minecraftforum.net/forums/mapping-and-modding/resource-packs/1226351-1?comment=11128
https://minecraft.gamepedia.com/1.13/Flattening
# Configuration for OptiFine's Natural Textures feature
# Location: /assets/minecraft/optifine/natural.properties
#
# Configuration format
# <texture_name> = <value>
#
# Values
# 4 = Rotate x 90� (4 variants)
# 2 = Rotate x 180� (2 variants)
# F = Flip texture horizontally (2 variants)
# 4F = 4 + Flip (8 variants)
# 2F = 2 + Flip (4 variants)
#
# Example for obsidian texture which can rotate with 4 variants and flip
# obsidian = 4F
#

# Grass
grass_block_side = F
grass_block_side_overlay = F
grass_block_snow = F
mycelium_side = F
mycelium_top = 4F
grass_path_top = 4
grass_path_side = F
# Snow
snow = 4F
# Dirt
coarse_dirt = 4F
podzol_top = 4F
podzol_side = F
farmland = 2F
farmland_moist = 2F
# Stone
granite = 2F
diorite = 2F
andesite = 2F
sandstone_top = 4
sandstone_bottom = 4F
stone_slab_top = F
end_stone = 4
# Gravel
gravel = 2
clay = 4F
# Logs
oak_log = 2F
spruce_log = 2F
birch_log = F
jungle_log = 2F
acacia_log = 2F
dark_oak_log = 2F
oak_log_top = 4F
spruce_log_top = 4F
birch_log_top = 4F
jungle_log_top = 4F
acacia_log_top = 4F
dark_oak_log_top = 4F
# Leaves
oak_leaves = 2F
spruce_leaves = 2F
birch_leaves = 2F
jungle_leaves = 2
dark_oak_leaves = 2F
acacia_leaves = 2F
# Ores
gold_ore = 2F
iron_ore = 2F
coal_ore = 2F
diamond_ore = 2F
redstone_ore = 2F
lapis_ore = 2F
# Nether
netherrack = 4F
nether_quartz_ore = 2
soul_sand = 4F
glowstone = 4
# Redstone
redstone_lamp_on = 4F
redstone_lamp = 4F
# Prismarine
prismarine = 4F
# Misc
obsidian = 4F
cactus_side = 2F
###############################################################################
# Sample configuration for OptiFine's Custom Loading Screens feature.
###############################################################################
# loading.properties
###############################################################################
# This file is offered without any copyright restrictions. 
# Please copy and modify it to suit your needs.
#
# Location: "/assets/minecraft/optifine/gui/loading/loading.properties"
# Controls the behaviour of the world loading screen
#
# Custom loading screen backgrounds per dimension can be defined as:
#    /assets/minecraft/optifine/gui/loading/background<dim>.png
# where "dim" is the dimension id:
#   - nether    = -1
#   - overworld = 0
#   - the end   = 1
#
# Modded dimensions can also be configured in this way. 

# Scale mode (optional)
# Custom scale mode for the background texture.
# Values
#   fixed - use fixed scale (default)
#   full - full screen, keep aspect ratio
#   stretch - fullscreen
scaleMode=<fixed|full|stretch>

# Scale (optional)
# Custom scale for the background texture.
# For scale mode "fixed" it defines the scale to use (default is 2). 
# This is combined with the curent GUI scale.
# For scale modes "full" and "stretch" it defines how many full textures should 
# fit on the screen (default is 1).
scale=2

# Center (optional)
# Defines if the background texture should be centered on the screen.
# Default is false.
center=<true|false>

# The properties "scaleMode", "scale" and "center" can also be configured per dimension
dim<dim>.scaleMode=<fixed|full|stretch>
dim<dim>.scale=2
dim<dim>.center=<true|false>
 
===============================================
Description of OptiFine's HD Fonts feature
Based on McPatcher's HD Fonts
===============================================

HD Fonts
========

As of 1.6, Minecraft allows fonts to be higher resolution than the default, but customization is still limited.

OptiFine first looks for fonts in the "assets/minecraft/optifine/font" folder. 
This allows you to have a custom font that works in vanilla and a higher resolution font that requires OptiFine to display properly.

    Default font: assets/minecraft/optifine/font/ascii.png
    Enchanting table font: assets/minecraft/optifine/font/ascii_sga.png

Note: Unicode fonts are not supported.

To allow for more control over the widths of individual characters, OptiFine offers a way to specify them manually. 
Create a properties file called:

    assets/minecraft/optifine/font/ascii.properties
    assets/minecraft/optifine/font/ascii_sga.properties

corresponding to the font you wish to customize.

Properties file format
======================

Each line in this file specifies the width of a character:

  # Custom width
  width.<ascii value 0-255>=<width 0-8>

For example, to specify the widths of capital A, B, and C, you might use

  # ABC
  width.65=5.9
  width.66=5
  width.67=5.25

Values can be floating point numbers (Vanilla only supports integer widths) and range from 0-8 regardless of the resolution of the font. 
You do not need to specify widths for all characters, only the ones where you want to override the default width.

The space character default width is 4.0. 
You can override this the same way, by setting "width.32" to a custom value.

Alpha Blending
==============

When enabled the font will use alpha blending

  # Alpha blending
  blend=<true|false>

Bold offset
===========

Bold characters are rendered twice with a small X offset which corresponds to the character stroke width. 
The default offset is 1.0 for standard 8x fonts (texture 128x128) and 0.5 for higher resolutions.

  # Bold offset
  offsetBold=<value>

Reference
=========
https://bitbucket.org/prupe/mcpatcher/wiki/HD_Fonts

###############################################################################
# Sample configuration for OptiFine's Emissive Textures feature.
###############################################################################
# emissive.properties
# This file should be placed in the resource pack folder "assets/minecraft/optifine" 
###############################################################################
###############################################################################
# Emissive textures
###############################################################################
# It is possible to add overlays to block textures, which will always rendered 
# with full brightness. This can simulate light emitting parts of the textures.
# The emissive overlays have the same name as the base texture + custom suffix.
# For example:
#   bedrock.png   - base texture
#   bedrock_e.png - emissive overlay
# The emissive overlays are rendered in the same block layer as the base texture,
# except overlays for textures from layer SOLID, which are rendered as CUTOUT_MIPPED.
# The overlays can also be used for items, mobs and block entities.
suffix.emissive=_e

###############################################################################
# Sample configuration for OptiFine's Dynamic Lights feature.
###############################################################################
# dynamic_lights.properties
###############################################################################
# This file is offered without any copyright restrictions. 
# Please copy and modify it to suit your needs.
#
# This configuration file allows mods to define dynamic light levels for entities and items.
# Location: "/assets/<mod_id>/optifine/dynamic_lights.properties"

# Entity light levels
# The entity name is automatically expanded with the mod_id.
# The light level should be between 0 and 15. 
# For exaple:
#   entities=basalz:15 blitz:7
entities=<entity:light> ...  

# Item light levels
# The item name is automatically expanded with the mod_id.
# The light level should be between 0 and 15. 
# For exaple:
#   items=florb:15 morb:7
items=<item:light> ...  
 
===============================================
Description of OptiFine's Custom Lightmaps
Based on McPatcher's Custom Lightmaps
===============================================

Custom Lightmaps
================

OptiFine allows you to customize the lighting in the game.

How lighting works in vanilla
=============================

Every block has two light values from 0 to 15 assigned to it, one for sky brightness and one for torch brightness. 
A block in direct sunlight has a sky value of 15. A block in the shade directly adjacent to it has a value of 14 and so on. 
Blocks deep underground far from any block that can see the sky have sky brightness 0. Similarly for torches. 
A torch block has light value 14 (15 for glowstone) and the light value drops by 1 each block away from it.

To generate the lighting you actually see in game, Minecraft uses a 16x16 lightmap. 
Its axes correspond to the 16 light levels of each type. If a block has torch brightness x and sky brightness y, 
then the point (x,y) is used for its lightmap coordinates. The lightmap is not in any of the game's files but is generated each frame. 
Two variables affect the lightmap, the time of day and the torch flicker. Minecraft implements dusk/dawn transitions and torch flicker 
by making the entire lightmap darker or lighter rather than by adjusting the sky/torch brightness values.

Custom lighting
===============

To create custom lighting, you will need a lightmap palette for each world:

    Nether: assets/minecraft/optifine/lightmap/world-1.png
    Overworld: assets/minecraft/optifine/lightmap/world0.png
    The End: assets/minecraft/optifine/lightmap/world1.png

For the overworld you may also specify optional rain and thunder palettes:

    Overworld rain: assets/minecraft/optifine/lightmap/world0_rain.png
    Overworld thunder: assets/minecraft/optifine/lightmap/world0_thunder.png
    
The rain and thunder palettes are only active when the main world palette is defined.

Each palette can be any width, but must be 32 or 64 pixels tall. If it's 64, the bottom half is used for nightvision, discussed later. 
Of the 32 rows of pixels, the top 16 represent sunlight and the bottom 16 represent torchlight. 
Two columns, 16 pixels from the top half and 16 pixels from the bottom half, are chosen to form the axes of the final 16x16 lightmap 
used for rendering.

Template: images/lightmap_template.png

Blue=night, orange=dusk/dawn, cyan=day, yellow=lightning. 

In the top half, the left-hand side represents night and the right-hand side represents day, with the dusk/dawn transitions in between. 
The very far right of the palette represents lightning flashes. Again, there is no specified width for the palette, 
but more width means more room for detail in the transitions.

Torches work similarly, but in this case the x coordinate is simply a random value simulating torch flicker. 
The variation along the x dimension will determine how noticable torch flicker is. 
To have completely steady torchlight with no flicker, make all pixels along each row the same color.

Lightmaps work the same in all three worlds (Overworld, Nether, The End), but since there is no night or day in Nether and The End, 
the "time of day" value is constant. For these worlds you can simply give rows 0-15 the same color all the way across.

Nightvision effect
==================

In the vanilla game, the nightvision effect is computed by scaling the RGB values by 1.0 / max(R,G,B). 
For example, (0.2, 0.3, 0.6) would brighten to (0.333, 0.5, 1.0) after dividing by 0.6. 
You can override this behavior with a custom lightmap by making the height 64 pixels instead of 32. 
Provide four palettes instead of two: normal sun, normal torch, nightvision sun, nightvision torch. 
Lightmap generation works exactly the same way but using rows 32-47 and 48-63 instead.

References
==========
https://bitbucket.org/prupe/mcpatcher/wiki/Lightmaps
####################################################
# Description of OptiFine's Custom GUIs feature
####################################################
# For each container GUI texture that you wish to override, use this template 
# and create a .properties file in the "assets/minecraft/optifine/gui/container"
# folder of your resource pack.  Properties files can be organized
# into subfolders of any depth, as long as everything is within the top-level
# "assets/minecraft/optifine/gui/container" folder.
#
# Different container types have different requirements and restrictions.  
# See below for details for each container type.
#
####################################################
# General properties
#
# Container (required)
# Values: 
#   anvil beacon brewing_stand chest crafting dispenser enchantment furnace 
#   hopper horse villager shulker_box creative inventory
container=<container>
#
# Texture (required)
# Replacement for the GUI texture
# The "texture" property replaces the default GUI texture. 
# The "texture.<path>" property can be used to replace any GUI texture
# <path> is relative to "/assets/minecraft/textures/gui" 
# The creative inventory GUI does not have a default texture so it has to use path textures.
#
# Example for creative inventory:
#   # File "assets/minecraft/optifine/gui/container/creative/creative_desert.properties
#   container=creative
#   biomes=desert
#   texture.container/creative_inventory/tab_inventory=tab_inventory_desert
#   texture.container/creative_inventory/tabs=tabs_desert
#   texture.container/creative_inventory/tab_items=tab_items_desert
#   texture.container/creative_inventory/tab_item_search=tab_item_search_desert
#
# At least one "texture" or "texture.<path>" is required.
texture=<texture>
texture.<path>=<texture>
#
# Custom entity or block entity name (optional)
#
# The name uses the syntax similar to the Custom Item Textures NBT tags. 
# A value starting with "!" performs a negative match (not).
#
# Examples:
# - Match name:
#   name=My Sword
#
# - Match name with special formatting:
# NOTE: For best compatibility, use the escape sequence '\u00a7' instead of �:
#   name=\u00a74\u00a7oMy Sword
#
# - Wildcards using ? and *
#   name=pattern:Letter to *
# Matches
#   Letter to Herobrine
#   Letter to a creeper
# but not
#   letter to Herobrine
#
# - Wildcards, case insensitive
#   name=ipattern:Letter to *
# Matches
#   Letter to Herobrine
#   Letter to a creeper
#   letter to Herobrine
#
# - Java regular expressions
#   (See http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html)
#   name=regex:Letter (to|from) .*
# Matches
#   Letter to Herobrine
#   Letter from Herobrine
# but not
#   letter to Herobrine
#   A Letter to Herobrine
#
# - Java regular expressions, case insensitive
#   name=iregex:Letter (to|from) .*
# Matches
#   Letter to Herobrine
#   Letter from Herobrine
#   letter to Herobrine
# but not
#   A Letter to Herobrine
#
# NOTE: Any backslashes must be doubled as well.  Literal backslashes within a
# regular expression or wildcard must be quadrupled.
# Correct:
#   name=regex:\\d+
#   name=regex:\\\\
#   name=/\\/\\
# Wrong:
#   name=regex:\d+
#   name=regex:\\
#   name=/\/\
name=<name>
#
# Biomes (optional)
# The vanilla biome names are listed here: https://minecraft.gamepedia.com/Biome#Biome_IDs
# Biomes added by mods can also be used.
biomes=<biome list>
#
# Heights (optional)
heights=<height ranges>
#
####################################################
# Chest specific properties
#
# Large chest (optional)
large=<true|false>
#
# Trapped chest (optinal)
trapped=<true|false>
# 
# Christmas chest (optional)
christmas=<true|false>
#
# Ender chest (optional)
ender=<true|false>
#
####################################################
# Beacon specific properties
#
# Levels (optional)
levels=<levels>
#
####################################################
# Villager specific properties
#
# Professions (optional)
# List of villager professions with optional levels
#
# Entry format
#   <profession>[:level1,level2,...]
#
# Professions: none, armorer, butcher, cartographer, cleric, farmer, fisherman, fletcher, 
#              leatherworker, librarian, mason, nitwit, shepherd, toolsmith, weaponsmith 
#
# Example:
#   # Professions farmer (all levels) or librarian (levels 1,3,4)
#   professions=farmer librarian:1,3-4
#   # Professions full
#   professions=minecraft:fisherman minecraft:shepherd minecraft:nitwit
professions=<professions>
#
####################################################
# Horse and dispenser specific properties
#
# Variants (optional)
# Horse variants: horse donkey mule llama
# Dispenser variants: dispenser dropper
variants=<variants>
#
####################################################
# Lllama and shulker box specific properties
#
# Colors (optional)
# Shulker box color or llama carpet color
# List of colors: white orange magenta light_blue yellow lime pink gray light_gray cyan purple blue brown green red black
colors=<colors>
#
===================================================
Description of OptiFine's Custom Animations feature
Based on McPatcher's Custom Animations
===================================================

Animated textures
=================

In Minecraft 1.5, Mojang added the ability to animate any block or item texture (originally a feature provided by MCPatcher). 
However, there is yet no way to animate other textures like mob skins or GUIs. OptiFine fills the gap enabling 
any rectangular area of any non-block or item texture to be animated. This includes even textures specific to other OptiFine features 
such as random mob skins or skyboxes.

For block and item textures, including CTM and CIT replacements, continue using Mojang's mcmeta method instead.

To build an animation, first choose a texture and determine the x and y coordinates and width and height of the area you want to animate. 
Create your animation as a vertical strip of frames. The width of the animation should be the same as the width of the area you want to animate. 
The height should be a multiple of the animation area height.

Properties file format

Create a properties file with any name you like. Put it in the assets/minecraft/optifine/anim folder of your texture pack, 
or any subfolder within. Add these properties to the file

  # Custom animation
  from=<path to animation>
  to=<path to texture to animate>
  x=<x coordinate of area to animate>
  y=<y coordinate of area to animate>
  w=<width of area to animate>
  h=<height of area to animate>
  # Optional
  duration=<default frame duration in ticks>
  interpolate=<true|false>
  skip=<interpolation ticks to skip>

See About Properties Files for how to specify paths to texture files (properties_files.txt).

This creates a simple animation that plays each frame in order from top to bottom once for one tick (1/20th second) each and then loops.

Multiple, non-overlapping parts of the same texture can be animated by using the same to value with different from, x, y, w, h values. 
They can even have independent timing and frame order information.

For maximum compatibility, it is best to make x, y, w, and h multiples of 16.

Frame order and timing
======================

Each custom animation may also specify its animation speed and frame order. In the properties file, add a series of entries

  # Frame timing
  tile.X=Y
  duration.X=Z

X starts at 0 and represents the order you want frames to display in. Y is the tile number in the animation .png file, 
the first tile being 0, the second 1, etc. Z is the duration you want that frame displayed, in game ticks (1 tick = 1/20 second). 
If omitted, duration is assumed to be the default frame duration or 1 if not configured.

For example, suppose your animation file is 16x48 (3 frames). To make it run on a 5-frame cycle with a pause in the middle, 
the properties file might look like this:

  # Animate 5 frames
  tile.0=0
  tile.1=1
  tile.2=2
  duration.2=5
  tile.3=1
  tile.4=0

The animation happens in this order:

  Frame 0: Display animation tile 0 for 1 tick (default duration).
  Frame 1: Display animation tile 1 for 1 tick (default duration).
  Frame 2: Display animation tile 2 for 5 ticks (duration=5).
  Frame 3: Display animation tile 1 for 1 tick (default duration).
  Frame 4: Display animation tile 0 for 1 tick (default duration).
  Go back to frame 0.
  Total: 5 frames over 9 ticks.

References
==========
https://bitbucket.org/prupe/mcpatcher/wiki/Custom_Animations
###############################################################################
# Sample configuration for OptiFine's Connected Textures feature.
# Based on the configuration for MCPatcher's Connected Textures mod.
#
# Not implemented:
# - renderPass
#
###############################################################################
# ctm.properties
###############################################################################
#
# For each block or terrain tile you wish to override with connected or random
# textures, use this template and create a .properties file in the
# optifine/ctm folder of your texture pack.  Properties files can be organized
# into subfolders of any depth, as long as everything is within the top-level
# optifine/ctm folder.
#
# Different types of connected texture methods are available with different
# requirements and restrictions.  See below for details for each method.
#
# All property names are case-sensitive.
# All paths are relative to assets/minecraft unless otherwise stated.
###############################################################################

###############################################################################
# General properties used by all methods:
###############################################################################

# (Optional) List of block and/or tiles this method should apply to.
# Multiple .properties file can refer to the same block/tile and they will be
# processed in alphabetical order by filename.  All tile-based entries are
# checked before block ID-based ones.  The first match wins.
matchTiles=<list of matching tile names>

# To refer to a tile from vanilla MC, simply use its name in textures/block:
#   matchTiles=dirt
# To refer to a tile from a mod, you will need to know its name
#   matchTiles=botania:blazeblock
# Tiles output by CTM rules can also be matched by another rule.  The tile name
# is simply the full path to the tile
#   matchTiles=optifine/ctm/mygrass/1.png
# Block format (optional parts are in <>)
#   <namespace:>name<:property1=value1,value2...:property2=value1,value2...>
# For example:
#   short name:         oak_stairs
#   full name:          minecraft:oak_stairs
#   name + properties:  minecraft:oak_stairs:facing=east,west:half=bottom
matchBlocks=<list of blocks + optional properties>

# These two properties can be omitted if they can be inferred from the filename instead:  
# - optifine/ctm/xxx/<name>.properties assumes
#     matchTiles=<name>
# - optifine/ctm/xxx/block_<name>.properties assumes
#     matchBlocks=<name>
# unless you specify either property explicitly.

# (Optional) If multiple properties files match the same block, the highest
# weighted one is used.  In the event of a tie, the properties filenames are
# compared next.  The default weight is 0.
weight=<integer>

# (Required) Method to use when choosing a block's replacement texture:
# Methods:
#   ctm: Standard 8-way method (glass in the original CTM), uses 47 tiles.
#   ctm_compact: Compact 8-way method, uses 5 tiles.
#   horizontal: Connect to blocks on left and right only (bookshelves).
#   vertical: Connect to blocks above and below only.
#   horizontal+vertical: Connect horizontally, then vertically.
#   vertical+horizontal: Connect vertically, then horizontally.
#   top: Connect to block above only (sandstone).
#   random: Pick a tile at random.
#   repeat: Repeat a fixed pattern over large areas.
#   fixed: Use a single fixed tile.  Equivalent to random with only one tile.
#   overlay: Overlay for block transitions, uses 17 tiles.
#   overlay_ctm: Overlay variant of method "ctm".
#   overlay_random: Overlay variant of method "random".
#   overlay_repeat: Overlay variant of method "repeat".
#   overlay_fixed: Overlay variant of method "fixed".
# The overlay methods can be combined with other methods if they come 
# before them in the processing order (alphabetically). 
# The method "ctm_compact" is not compatible with any of the overlay methods.
method=<method>

# (Required) List of replacment tiles to use.  Each tile must be a separate
# image, just like terrain and item textures.  Tiles can be specified in
# several ways
#   0                   -> 0.png
#   8-11                -> 8.png, 9.png, 10.png, 11.png
#   name                -> name.png
#   name.png            -> name.png
#   <skip>              -> skip the tile, continue with next CTM properties
#   <default>           -> use the default texture for that block/tile
#   full/path/name.png  -> full/path/name.png
# In all cases but the last, the png file must be in the same directory as
# the properties file itself.
# The formats can be mixed and matched, e.g.
#   tiles=0-4 5 some/other/name.png
# The overlay methods may use the special name "<skip>" for empty tiles 
# that are to be skipped. The overlay methods can't use the tile name "<default>".
tiles=<list of tiles>

# (Optional) Connect type.  For methods that connect to adjacent blocks,
# specify how the game should decide if two blocks should be connected.
#   block: Connect if block id of this block = block id of neighbor.
#   tile: Connect if tile texture of this block = tile of neighbor.
#   material: Connect if block material (stone, dirt, etc.) = neighbor's.
#   state: Connect if block state (block + properties) = neighbour's
# The default is block for block-based properties files and tile for tile-based.
connect=<block | tile | material | state>

# (Optional) Connect tiles. Only for method "overlay"
# Connects only to blocks which are using the specified tiles 
connectTiles=<list of tiles>

# (Optional) Connect blocks. Only for method "overlay"
# Connects only to specified blocks 
connectBlocks=<list of blocks>

# (Optional) Faces.  
# Limit the mod to only certain faces of the block.
#   bottom: Bottom face (negative y).
#   top: Top face (positive y).
#   north: North face (negative z).
#   south: South face (positive z).
#   east: East face (positive x).
#   west: West face (negative x).
#   sides: Shorthand for north south east west.
#   all: All sides.
# This property is ignored on non-standard blocks.
faces=<combination of: north south east west top bottom sides all>

# (Optional) Biome and height restrictions.  
# Limit only to certain biomes or height ranges.
# The vanilla biome names are listed here: https://minecraft.gamepedia.com/Biome#Biome_IDs
# Biomes added by mods can also be used.
# The legacy properties "minHeight" and "maxHeight" are also recognized.
biomes=<biome list>
heights=<height ranges>

# (Optional) Compact CTM tile replacement. Only for method "ctm_compact"
# Allows to define replacement tile for a specific CTM case
# <ctm_index> is the index of the CTM case from the CTM template (0-46)
# <tile_index> is the index of the tile as defined in "tiles" (not the tile name!)
# With "ctm_compact" you can define more than 5 tiles and use the additional 
# tiles as replacements
ctm.<ctm_index>=<tile_index>  

# (Optional) Tint index. Only for method "overlay"
# Tint index for the tile texture
# Default is -1 (disabled
tintIndex=<index>

# (Optional) Tint block. Only for method "overlay"
# The block used for the tile texture tinting. 
# Different blocks use different colors for the same tint index. 
tintBlock=<block>

# (Optional) Layer. Only for method "overlay"
# The layer on which the overlay texture should be rendered
# Values:
#   cutout_mipped - transparent textures with mipmaps
#   cutout - transparent textures without mipmaps
#   translucent - translucent textures with mipmaps
# Default is "cutout_mipped" 
layer=<cutout_mipped|cutout|translucent>

# (Optional) Name
# Only for blocks which have corresponding nameable tile entities.
# For example:
#   beacon brewing_stand enchanting_table furnace dispenser dropper hopper
# See "custom_guis.properties" for the name matching syntax. 
name=<name>

###############################################################################
# Everything below here is for specific ctm methods.  Each .properties file
# should contain only one of these sections.
###############################################################################

###############################################################################
# Standard 8-way connected textures
###############################################################################

method=ctm
# (Required) List of 47 tiles to use.
tiles=<47 tiles>
# (Optional) Whether to show seams on inner edges when connecting to adjacent
# blocks.
innerSeams=false

###############################################################################
# Compact 8-way connected textures
###############################################################################

method=ctm_compact
# (Required) List of 5 tiles to use.
tiles=<5 tiles>
# (Optional) Whether to show seams on inner edges when connecting to adjacent
# blocks.
innerSeams=false

###############################################################################
# Compact 8-way connected textures with special cases
###############################################################################

method=ctm_compact
# (Required) List of 5 tiles to use.
tiles=<5 tiles> <additional tiles>
# (Optional) Indexes of replacement tiles for some CTM cases
ctm.46=5
ctm.17=6

###############################################################################
# Horizontal-only connected textures
###############################################################################

method=horizontal
# (Required) List of 4 tiles to use.
tiles=<4 tiles>

###############################################################################
# Vertical-only connected textures
###############################################################################

method=vertical
# (Required) List of 4 tiles to use.
tiles=<list of tiles>

###############################################################################
# Top connected textures
###############################################################################

method=top
# (Required) Only one tile is needed.
tiles=<single tile>

###############################################################################
# Random textures
###############################################################################

method=random
# (Required) List of any number of tiles to choose from.
tiles=<list of tiles>
# (Optional) List of weights to apply to the random choice.  For example, if
# you have
# tiles=6-11
# weights=10 1 10 2 7 3
# then tiles 6 and 8 will have a weight of 10, 7 will have a weight of 1, etc.
# Weights do not have to total 100 or any other particular value.  In the above
# example, tiles 6 and 8 will each be used ~30.3% (10/(10+1+10+2+7+3)) of the
# time and so forth.
weights=<same-size list of weights>
# Random loops
# Repeats the random function several times to increase randomness.
# Can be used to make different textures use different random patterns.
# Higher values may decrease the chunk loading speed.
# Default is 0.
randomLoops=<0-9>
# (Optional) Desired level of symmetry for the faces of each block.  Applies to
# standard 6-sided blocks only.
# none: All 6 faces are textured independently.  This is the default.
# opposite: 2-way symmetry; opposing faces have the same texture, but each pair
# can potentially have a different texture.
# all: All 6 faces have the same texture.
symmetry=<none | opposite | all>
# (Optional) Texture linking between related blocks.
# If true, OptiFine uses the same random number seed for all parts of a
# multiblock object, for example, the top and bottom halves of tall grass.
# This allows you to create randomized textures that will remain consistent
# within each set of blocks.  If this property is false, the two halves will
# be "scrambled", i.e., chosen independently.
#
# NOTE: For this to work properly, you'll need multiple properties files with
# linked=true and the same number of replacement textures and same set of
# weights.  For example,
# double_plant_top.properties:
#   method=random
#   tiles=grass_top1 grass_top2 grass_top3
#   weights=1 2 3
#   linked=true

# double_plant_bottom.properties:
#   method=random
#   tiles=grass_bottom1 grass_bottom2 grass_bottom3
#   weights=1 2 3
#   linked=true
#
# The default is false.  The linked property currently applies only to plants
# (e.g., reeds), double plants, and doors.
linked=<true | false>

###############################################################################
# Repeat pattern textures
###############################################################################

method=repeat
# (Required) Width of the repeating pattern.
width=<width of pattern>
# (Required) Height of the repeating pattern.
height=<height of pattern>
# (Required) List of exactly width * height tiles.
tiles=<list of width * height tiles>
# (Optional) Desired level of symmetry for the faces of each block.  Applies to
# standard 6-sided blocks only.
# none: All 6 faces are textured so that the pattern tiling looks the same from
# all sides.  This is the default.
# opposite: 2-way symmetry; opposing faces have the same texture, which means
# that tiling on the south and east faces will be mirrored left-to-right from
# compared to the north and west faces.
symmetry=<none | opposite>

###############################################################################
# Fixed textures
###############################################################################

method=fixed
# (Required) Single tile to use.
tiles=<single tile>

###############################################################################
# Sample configuration for OptiFine's Custom Colors feature.
# Based on the configuration for MCPatcher's Custom Colors mod.
#
###############################################################################
# colormap.properties
###############################################################################
# Each custom colormap must have a properties file, except for "fixed"
# colormaps like pine.png or underwater.png.
#
# This file is offered without any copyright restrictions. Please copy and
# modify it to suit your needs.  Then place it in the optifine/colormap/blocks
# folder or any subfolder within.
#
# All property names are case-sensitive.
# All colors are in hex rgb format, 000000 to ffffff.
# All paths are relative to assets/minecraft unless otherwise stated.
###############################################################################

###############################################################################
# Format of colormap.
###############################################################################
# fixed:   Single fixed color, no image required.  Useful for removing vanilla
#          biome coloring without having to create a 256x256 all-white
#          colormap.
# vanilla: Vanilla temperature+humidity 256x256 map.  Limited by the fact that
#          different biomes share the same base temp+humidity values.
# grid:    OptiFine-style grid (x=biome ID, y=height) 256x256 map.  Each
#          column represents a single biome from the void to the max build
#          height.  Unused columns should be filled in with a reasonable
#          default gradient of colors to accommodate biomes added by mods.
# The default format is vanilla, but this can be overridden globally by setting
# palette.format in ~/color.properties.
format=<fixed | vanilla | grid>

###############################################################################
# (Optional) List of blocks (with optional properties) to apply the colormap to.
###############################################################################
# In 1.7, blocks are referred to by name rather than number.  Numerical IDs are
# supported for older blocks, but newer blocks will be name only.  Stone blocks
# for example can be referred to as
#   stone           (name without prefix)
#   minecraft:stone (full name)
#
# To color all stone and ore blocks:
#   blocks=stone gold_ore iron_ore coal_ore lapis_ore diamond_ore redstone_ore redstone_ore:lit=true
#
# Block + properties is also supported using the following syntax:
#   blocks=minecraft:lever:face=wall:facing=east,west
#
# If not set (or if there is no properties file), it defaults based on the
# filename, e.g.,
#   assets/minecraft/optifine/colormap/custom/stone.png -> minecraft:stone
blocks=<list of blocks + optional properties>

###############################################################################
# (format=fixed or vanilla only) Color map image.
###############################################################################
# Path can be relative to the location of the properties file.  The image
# should be a 256x256 color map.  If no source is given, a png with the same
# name as the properties file is used as a default.
source=<image>

###############################################################################
# (Optional) Fixed RGB color.
###############################################################################
# For format=fixed, this is simply the fixed color to be applied to all
# matching blocks.  If no value is given, the default is white (ffffff).
#
# For format=vanilla or grid, this is the default color used for held or
# dropped blocks.  If no value is given, the default color is instead taken
# from a fixed location depending on the format:
#   format=vanilla: x=127,y=127 (center of bitmap)
#   format=grid:    x=1,y=64    (plains biome at sea level)
color=<rgb value in hex>

###############################################################################
# (format=grid only) y variance value.
###############################################################################
# This adds a configurable amount of random noise to the y coordinate before it
# is used in the colormap.  For example a value of 2.0 will choose a value
# from the the colormap from y - 2 to y + 2.
# The default is 0 (no variance).
yVariance=<value>

###############################################################################
# (format=grid only) y offset value.
###############################################################################
# This subtracts a fixed value from the block's y coordinate before sampling
# from the colormap.  For example a value of 64 will use the pixel at 0 for
# blocks between layer 0 and 64.  A block at 65 will use pixel 1, 66 pixel 2,
# etc.
# The default is 0 (no offset).
yOffset=<value>
###############################################################################
# Sample configuration for OptiFine's Custom Colors feature.
# Based on the configuration for MCPatcher's Custom Colors mod.
#
###############################################################################
# color.properties
###############################################################################
#
# You only need to provide values for the properties you wish to change.  The
# default Minecraft values for each property are given below for convenience.
#
# All property names are case-sensitive.
# All colors are in hex rgb format, 000000 to ffffff.
# All paths are relative to assets/minecraft unless otherwise stated.
###############################################################################

###############################################################################
# Base color of particle effects
###############################################################################
# Base water particle (splashes, bubbles, drops) color.  Biome water color
# multiplier is applied to this value.  The value should match the color of
# your base water texture.  If your base water texture is grey so that you do
# coloring via misc/watercolorX.png, you should set this to ffffff.
particle.water=334cff
# Base portal particle color.  A random multiplier between 0.4 and 1.0 is
# applied to all three r/g/b values.
particle.portal=ff4ce5

###############################################################################
# Nether and End colors
###############################################################################
fog.nether=330707
fog.end=181318
sky.end=282828

###############################################################################
# Lily pad color
###############################################################################
# This is a single color that is used across all biomes.
lilypad=208030

###############################################################################
# Colors for each potion effect
###############################################################################
# Final color is the average of these colors weighted by level of each potion
# effect.
potion.absorption=2552a5
potion.blindness=1f1f23
potion.confusion=551d4a
potion.damageBoost=932423
potion.digSlowDown=4a4217
potion.digSpeed=d9c043
potion.fireResistance=e49a3a
potion.harm=430a09
potion.heal=f82423
potion.healthBoost=f87d23
potion.hunger=587653
potion.invisibility=7f8392
potion.glowing=94a061
potion.jump=786297
potion.levitation=ceffff
potion.luck=339900
potion.moveSlowdown=5a6c81
potion.moveSpeed=7cafc6
potion.nightVision=1f1fa1
potion.poison=4e9331
potion.regeneration=cd5cab
potion.resistance=99453a
potion.saturation=f82423
potion.unluck=c0a44d
potion.waterBreathing=2e5299
potion.weakness=484d48
potion.wither=352a27
# potion.water represents a plain bottle of water
potion.water=385dc6

###############################################################################
# Spawner egg colors
# egg.<shell|spots>.<entity>=<color>
# The entity name can be given in short or in full form.
# The separator ":" in the full form has to be escaped.
# For example:
#   egg.shell.creeper=0da70b
#   egg.spots.minecraft\:creeper=000000
###############################################################################
egg.shell.<entity>=<color>
egg.spots.<entity>=<color>

###############################################################################
# Map colors
# Aliases
#   map.snow=map.white
#   map.adobe=map.orange
#   map.lightBlue=map.light_blue
###############################################################################
# Block map colors
map.air=000000
map.grass=7fb238
map.sand=f7e9a3
map.cloth=c7c7c7
map.tnt=ff0000
map.ice=a0a0ff
map.iron=a7a7a7
map.foliage=007c00
map.clay=a4a8b8
map.dirt=976d4d
map.stone=707070
map.water=4040ff
map.wood=8f7748
map.quartz=fffcf5
map.gold=faee4d
map.diamond=5cdbd5
map.lapis=4a80ff
map.emerald=00d93a
map.podzol=815631
map.netherrack=700200
# General map colors
map.white=ffffff
map.orange=d87f33
map.magenta=b24cd8
map.light_blue=6699d8
map.yellow=e5e533
map.lime=7fcc19
map.pink=f27fa5
map.gray=4c4c4c
map.silver=999999
map.cyan=4c7f99
map.purple=7f3fb2
map.blue=334cb2
map.brown=664c33
map.green=667f33
map.red=993333
map.black=191919

# Banners use the general map colors.
# The banner colors can not be configured separately from the map colors.

###############################################################################
# Sheep colors
###############################################################################
sheep.white=ffffff
sheep.orange=f2b233
sheep.magenta=e57fd8
sheep.lightBlue=99b2f2
sheep.yellow=e5e533
sheep.lime=7fcc19
sheep.pink=f2b2cc
sheep.gray=4c4c4c
sheep.silver=999999
sheep.cyan=4c99b2
sheep.purple=b266e5
sheep.blue=3366cc
sheep.brown=7f664c
sheep.green=667f33
sheep.red=cc4c4c
sheep.black=191919

###############################################################################
# Wolf collar colors
###############################################################################
collar.white=ffffff
collar.orange=f2b233
collar.magenta=e57fd8
collar.lightBlue=99b2f2
collar.yellow=e5e533
collar.lime=7fcc19
collar.pink=f2b2cc
collar.gray=4c4c4c
collar.silver=999999
collar.cyan=4c99b2
collar.purple=b266e5
collar.blue=3366cc
collar.brown=7f664c
collar.green=667f33
collar.red=cc4c4c
collar.black=191919

###############################################################################
# Dye colors
# NOTE: These values are in the game but are not actually used anywhere.
###############################################################################
dye.black=1e1b1b
dye.red=b3312c
dye.green=3b511a
dye.brown=51301a
dye.blue=253192
dye.purple=7b2fbe
dye.cyan=287697
dye.silver=287697
dye.gray=434343
dye.pink=d88198
dye.lime=41cd34
dye.yellow=decf2a
dye.lightBlue=6689d3
dye.magenta=c354cd
dye.orange=eb8844
dye.white=f0f0f0

###############################################################################
# Text colors
###############################################################################
# color of exp level text
text.xpbar=80ff20
# color of "Boss Health" text
text.boss=ff00ff
# color of sign text
text.sign=000000
# color codes generated by \247 + 0123456789abcdef
text.code.0=000000
text.code.1=0000aa
text.code.2=00aa00
text.code.3=00aaaa
text.code.4=aa0000
text.code.5=aa00aa
text.code.6=ffaa00
text.code.7=aaaaaa
text.code.8=555555
text.code.9=5555ff
text.code.10=55ff55
text.code.11=55ffff
text.code.12=ff5555
text.code.13=ff55ff
text.code.14=ffff55
text.code.15=ffffff
text.code.16=000000
text.code.17=00002a
text.code.18=002a00
text.code.19=002a2a
text.code.20=2a0000
text.code.21=2a002a
text.code.22=2a2a00
text.code.23=2a2a2a
text.code.24=151515
text.code.25=15153f
text.code.26=153f15
text.code.27=153f3f
text.code.28=3f1515
text.code.29=3f153f
text.code.30=3f3f15
text.code.31=3f3f3f

###############################################################################
# Resource loading screen
###############################################################################
# Background color
screen.loading=ffffff
# Loading bar background color
screen.loading.bar=ffffff
# Loading bar outline
screen.loading.outline=000000
# Loading bar foreground color
screen.loading.progress=e22837
# Logo blend mode
# Where src, dst, srcA and dstA are one of: 
#   ZERO, ONE, SRC_COLOR, ONE_MINUS_SRC_COLOR, DST_COLOR, ONE_MINUS_DST_COLOR, 
#   SRC_ALPHA, ONE_MINUS_SRC_ALPHA, DST_ALPHA, ONE_MINUS_DST_ALPHA, SRC_ALPHA_SATURATE
screen.loading.blend=<off|src dst srcA dstA>

###############################################################################
# Other options
###############################################################################
# Override cloud type.
clouds=fast|fancy|none

# XpOrb animation duration (milliseconds)
# Default is 628 ms
xporb.time=628

###############################################################################
# Complete file list
###############################################################################
# Below is a full list of files used by the Custom Colors mod:
# NOTE: ~ is shorthand for the optifine folder (assets/minecraft/optifine)
# ~/color.properties - this file
# ~/colormap/redstone.png - 16x1 redstone colors (0=fully off, 15=fully on)
# ~/colormap/pumpkinstem.png - 8x1 pumpkin stem colors (0=sprout, 7=fully grown)
# ~/colormap/melonstem.png - 8x1 melon stem colors (0=sprout, 7=fully grown)
# ~/colormap/lavadrop.png - Nx1 lava drop colors (x=age of particle in ticks)
# ~/colormap/myceliumparticle.png - any size, random mycelium particle colors
# ~/colormap/xporb.png - any size, array of xp orb colors
# ~/colormap/durability.png - any size, array of item durability colors
#
# ~/colormap/swampgrass.png - 256x256 swamp grass color palette
# ~/colormap/swampfoliage.png - 256x256 swamp foliage color palette
# ~/colormap/pine.png - 256x256 pine tree color palette
# ~/colormap/birch.png - 256x256 birch tree color palette
# ~/colormap/water.png - 256x256 water color palette
# ~/colormap/underwater.png - 256x256 underwater color
# ~/colormap/underlava.png - 256x256 underlava color
# ~/colormap/fog0.png - 256x256 fog color for the overworld
# ~/colormap/sky0.png - 256x256 sky color for the overworld
#
# ~/lightmap/world0.png - Nx32 or Nx64 overworld lighting palettes
# ~/lightmap/world-1.png - Nx32 or Nx64 Nether lighting palettes
# ~/lightmap/world1.png - Nx32 or Nx64 End lighting palettes

###############################################################################
# Custom biome palettes
###############################################################################
# You may assign custom biome palettes to any standard block (i.e. one that
# does not already have its own special color multiplier method).  Each custom
# colormap should have a properties file in ~/colormap/custom.  See
# colormap.properties for more details.
#
# Default custom colormap format:
# Mojang-style temperature+humidity maps:
#   palette.format=vanilla
# OptiFine-style grid (x=biome ID, y=height) maps:
#   palette.format=grid
# Note that this setting does not affect the vanilla foliage and grass
# colormaps in assets/minecraft/textures/colormap.  It can also be overridden
# per-colormap in each individual properties file in ~/colormap/custom

###############################################################################
# Sample configuration for OptiFine's Custom Items feature.
# Based on the configuration for MCPatcher's Custom Item Textures mod.
#
# Not implemented
# - method
# - cap
# - fade
#
###############################################################################
# cit.properties
###############################################################################
#
# This file contains global properties for the Custom Item Textures mod and
# should be in the optifine/cit folder of the texture pack.  For individual
# item textures, see cit_single.properties.
#
# All property names are case-sensitive.
# All paths are relative to assets/minecraft unless otherwise stated.
###############################################################################

# (Optional) Specify how to apply multiple effects to the same item.
# Depending on the method chosen, multiple effects can be rendered with
# different intensities from 0 (not visible) to 1 (fully visible).
# average: Weighted average by enchantment level.
#              intensity = enchantment_level / sum(enchantment_levels)
# layered: Similar to average, but max is used instead of sum.
#              intensity = enchantment_level / max(enchantment_levels)
# cycle:   Cycle through each effect in turn.  The duration of each effect
#          can be set via the duration property.  The [group] value if present
#          allows multiple sets of effects to be cycled independently.
# Note that average and layered with cap=1 are equivalent and will both show
# only the "dominant" enchantment on an item.
method=<average | layered | cycle>

# (Optional) Specify how many layers can render for average/layered method.
# The topmost layers have priority over bottommost layers as determined by
# the layer value of each effect.
cap=<count>

# (Optional) The speed at which one effect transitions to another in a cycle.
# This does not affect the duration of the actual effect when displayed -- for
# that use the effect's duration property.
# The default is 0.5 seconds.
fade=<seconds>

# (Optional) Whether to use the default glint.png enchantment.  If true,
# glint.png is used if no other custom enchantment effect matches.  If set to
# false, the default glint.png enchantment stops rendering completely.  This is
# important for items that have no specific enchantment, but have an
# enchantment effect -- such as potions and golden apples.
# The default is true.
useGlint=<true | false>

###############################################################################
# Sample configuration for OptiFine's Custom Items feature.
# Based on the configuration for MCPatcher's Custom Item Textures mod.
# Reference: https://bitbucket.org/prupe/mcpatcher/wiki/Custom_Item_Textures
#
###############################################################################
# cit_single.properties
###############################################################################
#
# For each item you with to override with a custom texture, use this template
# and create a .properties file in the optifine/cit folder of your texture
# pack.  Properties files can be organized into subfolders of any depth, as
# long as everything is within the top-level optifine/cit folder.
#
# Each properties file specifies a list of matching item IDs or names, a
# replacement texture, and an optional set of rules specifying damage, stack
# size, or NBT tags.
#
# All property names are case-sensitive.
# All paths are relative to assets/minecraft unless otherwise stated.
###############################################################################

###############################################################################
# General properties used by all types:
###############################################################################

# (Optional) Type of texture replacement.
# item:        Simple item texture replacement.  Applies to items in GUI, held
#              in hand, and in the world.  If multiple properties files match
#              the same item, only the first (sorted by weight, then by
#              filename) is used.
# enchantment: Overlay texture for enchantments (replaces misc/glint.png).  If
#              multiple properties files match the same item, they are blended
#              together using rules specified in the global cit.properties
#              file.
# armor:       Armor texture replacement.  Applies to armor models worn by
#              players and mobs.  If multiple properties files match the same
#              item, only the first (sorted by weight, then by filename) is
#              used.
# elytra:      Elytra texture replacement.  Applies to elytra model worn by
#              players and mobs.  If multiple properties files match the same
#              item, only the first (sorted by weight, then by filename) is
#              used.
# The default type is item.  Each type has additional properties defined in
# later sections of this template.
type=<item | enchantment | armor | elytra>

# (Optional for type=enchantment, required for other types) List of items to
# apply the replacement texture to.
items=<list of item IDs>

# (Optional) Replacement texture.  Can be a full path or just a name:
# mytextures/excalibur.png -> mytextures/excalibur.png
# excalibur                -> optifine/cit/excalibur.png
# Texture format including animation is handled differently depending on the
# type.  See the type-specific sections below.
#
# If no texture is provided, OptiFine will use the name of the properties file,
# optifine/cit/excalibur.properties -> optifine/cit/excalibur.png
texture=<replacement texture>

# (Optional) Replacement model.
# A json item model in vanilla format (http://minecraft.gamepedia.com/Model#Item_models)
# item/mymodel -> /assets/minecraft/models/item/mymodel.json
# ./mymodel    -> mymodel.json from the same folder as the properties file
# The model may reference textures from the same folder, for example: "./mytexture"
model=<replacement model>  

# (Optional) List of damage values.  Use the replacement texture only when the
# item damage is a certain value or range.
#
# For items with durability, damage starts at 0 for a new item and increases as
# it gets damaged.  The max damage an item can take varies, see
# http://www.minecraftwiki.net/wiki/Item_durability
#
# For other items, damage represents different properties like potion type or
# wool color.  See http://www.minecraftwiki.net/wiki/Data_values for specifics.
damage=<damage values 0-65535>
# Damage can also be given as a percentage: 
# damage=0-50%
#
# An optional bitmask applied to the item's damage before checking it against
# the list of eligible damage values.  Examples,
# Match any Fire Resistance potion:
#   damage=3
#   damageMask=15
# Match any non-splash Fire Resistance potion:
#   damage=3
#   damageMask=16399
# Match non-splash Fire Resistance I potion only:
#   damage=3
#   damageMask=16447
# Match splash Fire Resistance II potion only:
#   damage=16403
#   damageMask=16447
# For a simpler way to do potions, see the section at the end of this file.
damageMask=<bitmask>

# (Optional) List of stack sizes.  Use the replacement texture only when the
# stack size is a certain value or range.
stackSize=<stack sizes 0-65535>

# (Optional) List of enchantment names.
# The enchantment names may be short ("flame") or full ("minecraft:flame").
# For example:
#   enchantments=minecraft:silk_touch sharpness smite 
# The legacy property "enchantmentIDs" is also recognized.
enchantments=<enchantment names>

# (Optional) List of enchantment levels.
enchantmentLevels=<enchantment levels 0-255>

# (Optional) Hand
# Hand in which the item is rendered (main hand, off hand)
# When rendered in the GUI the item is considered to be in the main hand.
# Default is "any"
hand=any|main|off

# Examples:
# Match Silk Touch, any level:
#   enchantmentIDs=33
# Match Flame or Fire Aspect, level 3 or higher:
#   enchantmentIDs=flame minecraft:fire_aspect
#   enchantmentLevels=3-
# Match any enchantment, with 8-10 total levels across all enchantments:
#   enchantmentLevels=8-10

# (Optional) NBT-based rule.  Use the replacement texture only when an NBT tag
# has a specific value.  If multiple rules are provided, all of them must
# match.  Use a utility like NBTExplorer to view the NBT tags for various
# items.
nbt.<tag>=<value>
# Currently, only the following NBT types are supported:
# - String, Integer, Short, Long, Double, Float - match exact value only
# - Compound - Can match a specific tag or any tag (*).
# - List - Can match a specific index (starting at 0) or any index (*).
# A value starting with "!" performs a negative match (not).
# Integer values can also be specified as hex color, for example #ff99cc.
# The list size is named "count". 
#
# Examples:
# Match item display name:
#   nbt.display.Name=My Sword
#
# Match item display name with special formatting:
# NOTE: For best compatibility, use the escape sequence '\u00a7' instead of §:
#   nbt.display.Name=\u00a74\u00a7oMy Sword
#
# Match item lore (first line only):
#   nbt.display.Lore.0=My Lore Text
#
# Match item lore (any line):
#   nbt.display.Lore.*=My Lore Text
#
# Strings can be matched in several ways:
# - Exact value
#   nbt.display.Name=Letter to Herobrine
# Matches the exact string "Letter to Herobrine" and nothing else.
#
# - Wildcards using ? and *
#   nbt.display.Name=pattern:Letter to *
# Matches
#   Letter to Herobrine
#   Letter to a creeper
# but not
#   letter to Herobrine
#
# - Wildcards, case insensitive
#   nbt.display.Name=ipattern:Letter to *
# Matches
#   Letter to Herobrine
#   Letter to a creeper
#   letter to Herobrine
#
# - Java regular expressions
#   (See http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html)
#   nbt.display.Name=regex:Letter (to|from) .*
# Matches
#   Letter to Herobrine
#   Letter from Herobrine
# but not
#   letter to Herobrine
#   A Letter to Herobrine
#
# - Java regular expressions, case insensitive
#   nbt.display.Name=iregex:Letter (to|from) .*
# Matches
#   Letter to Herobrine
#   Letter from Herobrine
#   letter to Herobrine
# but not
#   A Letter to Herobrine
#
# NOTE: Any backslashes must be doubled as well.  Literal backslashes within a
# regular expression or wildcard must be quadrupled.
# Correct:
#   nbt.display.name=regex:\\d+
#   nbt.display.name=regex:\\\\
#   nbt.display.name=/\\/\\
# Wrong:
#   nbt.display.name=regex:\d+
#   nbt.display.name=regex:\\
#   nbt.display.name=/\/\
#
# You can match potions with custom effects using "damage=0" and NBT rules:
#   items=potion
#   damage=0
#   nbt.CustomPotionEffects.0.Id=20
#
# To override the default potion tint, you can use a CustomPotionColor tag:
#   /give @p minecraft:potion 1 0 {CustomPotionEffects:[{Id:20,Amplifier:0,Duration:20}],CustomPotionColor:-1}
#
###############################################################################
# Type-specific properties
###############################################################################

###############################################################################
# Items
###############################################################################

type=item

# Texture format:
# Item replacement textures are stitched into items.png, and thus follow the
# same rules as normal item textures.  In particular, this means that
# animations must use Mojang's system of .mcmeta files for frame order and
# timing.
texture=<replacement texture>

# (Optional) Replacement for alternate textures.
# For items with more than one texture, this allows you to specify replacements
# for each separately.  For example, the vanilla bow has four possible textures
# depending on its state:  bow_standby, bow_pulling_0, bow_pulling_1,
# bow_pulling_2.  To replace all four, you could use
#   texture.bow_standby=my_special_bow_standby
#   texture.bow_pulling_0=my_special_bow_pulling_0
#   texture.bow_pulling_1=my_special_bow_pulling_1
#   texture.bow_pulling_2=my_special_bow_pulling_2
# Potions also have two textures.  To replace them, use
#   texture.potion_bottle_drinkable=...
#   -or-
#   texture.potion_bottle_splash=...
#   texture.potion_overlay=...
# If no texture.<name> property matches, the generic texture property is used
# instead.
texture.<name>=<replacement texture>

# (Optional) Replacement model.
# A json item model in vanilla format (http://minecraft.gamepedia.com/Model#Item_models)
# item/mymodel -> assets/minecraft/models/item/mymodel.json
# ./mymodel    -> mymodel.json from the same folder as the properties file
# The model may reference textures from the same folder, for example: "./mytexture"
model=<replacement model>  

# (Optional) Replacement for alternative models
# For items with more than one model, this allows you to specify replacements
# for each model separately, for example:
#   model.bow_standby=my_special_bow_standby
#   model.bow_pulling_0=my_special_bow_pulling_0
#   model.bow_pulling_1=my_special_bow_pulling_1
#   model.bow_pulling_2=my_special_bow_pulling_2
model.<name>=<replacement model>

# (Optional) If multiple properties files match the same item, the highest
# weighted one is used.  In the event of a tie, the properties filenames are
# compared next.  The default weight is 0.
weight=<integer>

###############################################################################
# Enchantments
###############################################################################

type=enchantment

# Texture format:
# The enchantment texture can be any resolution.  To animate an enchantment,
# use the anim/*.properties method with
#   to=<full path to enchantment texture>
texture=<enchantment texture>

# (Optional) Blend method when applying texture to the texture below it.  See
# Better Skies for a list of valid methods.  The default is add.
blend=<blend method>

# (Optional) Scrolling speed of texture.
# The default value is 0 (no scrolling).
speed=<value>

# (Optional) Angle of texture relative to the item.  If speed is non-zero, the
# texture will also scroll in this direction.
# The default value is 0.
rotation=<0-360 degrees>

# (Optional) Specifies a unique layer and the ordering of the layers as they
# overlap each other.  If two or more effects use the same layer, weight
# determines which effect is rendered (the other is not rendered).
# The default layer is 0 (bottommost).
layer=<integer>

# (Optional) Relative priority of the enchantment within a layer.
# Of the matching effects, only the highest weighted one within a layer is
# rendered.
# In other words,
# - The layer property determines the ORDER in which effects are rendered.
# - The weight property determines WHICH effect is rendered for each layer.
# If two effects have the same weight and layer, the filename is used as a
# tiebreaker.
# The default weight is 0.
weight=<integer>

# (Optional, for cycling enchantments only) Duration in seconds of enchantment
# in a cycle.
# The default is 1 second.
duration=<seconds>

###############################################################################
# Armor
###############################################################################

type=armor

# Texture format:
# The texture should match the format of the corresponding armor texture.  For
# animated textures, use the anim/*.properties method with
#   to=<path to replacement texture>

# (Required) Replacement textures.  You need a replacement for each texture in
# textures/models/armor for that armor type.
# For diamond armor,
#   texture.diamond_layer_1=my_diamond_armor_1
#   texture.diamond_layer_2=my_diamond_armor_2
# Leather armor has four layers:
#   texture.leather_layer_1=...
#   texture.leather_layer_1_overlay=...
#   texture.leather_layer_2=...
#   texture.leather_layer_2_overlay=...
# If no texture.<name> property is matching, the generic texture will be used.
texture.<name>=<replacement texture>

# (Optional) If multiple properties files match the same armor, the highest
# weighted one is used.  In the event of a tie, the properties filenames are
# compared next.  The default weight is 0.
weight=<integer>

###############################################################################
# Potions
###############################################################################

# http://www.minecraftwiki.net/wiki/Data_values#Potions
# As an alternative to listing potion damage values, you can specify
# replacement textures for potions using a filename based system.  Note that
# everything described here CAN be done via cit properties files; this is just
# a shortcut.
#
# There are two directories for potions:
#   optifine/cit/potion/normal - non-splash potions
#   optifine/cit/potion/splash - splash potions
#   optifine/cit/potion/linger - lingering potions
#
# Within either directory, create a .png file with the name of the potion
# effect.  No properties files are necessary.
#   absorption.png
#   blindness.png
#   confusion.png
#   damageboost.png    (*)
#   digslowdown.png
#   digspeed.png
#   fireresistance.png (*)
#   harm.png           (*)
#   heal.png           (*)
#   healthboost.png
#   hunger.png
#   invisibility.png   (*)
#   jump.png
#   moveslowdown.png   (*)
#   movespeed.png      (*)
#   nightvision.png    (*)
#   poison.png         (*)
#   regeneration.png   (*)
#   resistance.png
#   saturation.png
#   waterbreathing.png
#   weakness.png       (*)
#   wither.png
# The names are the same as the potion.* properties in Custom Colors'
# color.properties file.  Case matters.  Only potions marked (*) are obtainable
# in-game.  The others can only be created via editing.
#
# The replacement png will automatically be used for that potion type; no
# properties file required.  Note that this replaces BOTH
# potion.png/potion_splash.png and potion_contents.png from the standard potion
# rendering.  So be sure to include the colored liquid in the replacement art.
#
# Similarly, you can replace textures for the various "no effect" potions.
# These have non-splash versions only, and again only the ones marked (*)
# actually exist in-game.  The rest are in the code and are listed here only
# for completeness.
#   artless.png
#   awkward.png        (*)
#   bland.png
#   bulky.png
#   bungling.png
#   buttered.png
#   charming.png
#   clear.png
#   cordial.png
#   dashing.png
#   debonair.png
#   elegant.png
#   fancy.png
#   flat.png
#   foul.png
#   gross.png
#   harsh.png
#   milky.png
#   mundane.png        (*)
#   odorless.png
#   potent.png
#   rank.png
#   sparkling.png
#   stinky.png
#   suave.png
#   thick.png          (*)
#   thin.png
#   uninteresting.png
#
# If you'd rather have a single texture for all "no effect" potions, this file
# is used as a fallback for any that do not have a specific replacement as
# listed above:
#   optifine/cit/potion/normal/other.png
#
# Two additional textures (non-splash only) can also be provided:
#   optifine/cit/potion/normal/water.png - plain water bottle (item 373:0)
#   optifine/cit/potion/normal/empty.png - empty bottle (item 374)

######################################################################
# Json Part Model
# Reference configuration for OptiFine's feature Custom Entity Models
######################################################################
# This file contains the definition of one model part and it can be
# referenced as "model" from the entity model.
# The file extension ".jpm" is recommended, but not required.
# It should be located in the "assets/minecraft/optifine/cem" folder of your resource pack.
#
# Texture UV can be specified in box format with "textureOffset" or 
# individually with "uvDown", "uvUp", "uvNorth", "uvSouth", "uvWest" and "uvEast".
# Either the box format or the individual face UV should be used, they can not be mixed.
# The box format UV mapping is shown in "model_box.png".
#
# Textures can be specified as:
#   "texture" - (no '/' in name), look in current folder
#   "./folder/texture" - relative to current folder
#   "~/folder/texture" - relative to folder "assets/minecraft/optifine/"
#   "folder/texture" - relative to folder "assets/minecraft/"
#   "mod:folder/texture - resolves as "assets/mod/folder/texture.png"
# 
# The texture suffix ".png" is optional.
#
# Required elements:
# - "textureOffset" or individual face UV
# - "coordinates" 
#
# Note: This is not a valid JSON format and it should only be used as a reference  
######################################################################
{
  # Part model definition 
  "texture": <texture.png>,                                             - Texture used by the part model
  "textureSize": [<width>, <height>],                                   - Texture size in pixels
  "invertAxis": <axis_to_invert>,                                       - Axis to invert, for example "xyz" inverts all axes
  "translate": [<x>, <y>, <z>],                                         - Translate (pixels)
  "rotate": [<angle_x>, <angle_y>, <angle_z>],                          - Rotate (degrees)
  "mirrorTexture": <axis_to_mirror>,                                    - Texture axis to mirror, for example "uv" mirrors both U and V axis
  "boxes"                                                               - List of part model boxes
  [
    {
      "textureOffset": [<u>, <v>],                                      - Texture offset for box format, see "model_box.png"
      "uvDown": [<u1>, <v1>, <u2>, <v2>],                               - UV for face down
      "uvUp": [<u1>, <v1>, <u2>, <v2>],                                 - UV for face up
      "uvNorth": [<u1>, <v1>, <u2>, <v2>],                              - UV for face north, alias "uvFront"
      "uvSouth": [<u1>, <v1>, <u2>, <v2>],                              - UV for face south, alias "uvBack"
      "uvWest": [<u1>, <v1>, <u2>, <v2>],                               - UV for face west, alias "uvLeft"
      "uvEast": [<u1>, <v1>, <u2>, <v2>],                               - UV for face east, alias "uvRight"
      "coordinates": [<x>, <y>, <z>, <width>, <height>, <depth>],       - Box position and dimensions
      "sizeAdd": <size_add>                                             - Size increment (added to all dimensions) can be used for asymmetric scaling
    },
    ...
  ],
  "sprites"                                                             - List of 3D sprite models (depth 1)
  [
    {
      "textureOffset": [<u>, <v>],                                      - Texture offset (pixels)
      "coordinates": [<x>, <y>, <z>, <width>, <height>, <depth>],       - Box position and dimensions
      "sizeAdd": <size_add>                                             - Size increment (added to all dimensions) can be used for asymmetric scaling
    },
    ...
  ],
  "submodel":                                                           - Sub-model (attached to the parent, moving and rotating with it)
  {
    # Part model definition                                             - Sub-model definition                          
  },
  "submodels":                                                          - List of sub-models (attached to the parent, moving and rotating with it)
  [
    {
      # Part model definition                                           - Sub-model definition                          
    },
    ...
  ]
}
######################################################################
# Json Entity Model
# Reference configuration for OptiFine's feature Custom Entity Models
######################################################################
# For each entity model or tile entity model that you wish to override
# use this template and create a "<entity_name>.jem" file in the 
# "assets/minecraft/optifine/cem" folder of your resource pack. 
# The entity model contains a list of entity part models.
# The part models can be specified inline or loaded from external ".jpm" files.
#
# Special cases:
# - the mushrooms on the back of the Mooshroom can be customized with the textures 
#   "assets/minecraft/textures/entity/cow/red_mushroom.png"  
#   "assets/minecraft/textures/entity/cow/brown_mushroom.png"  
#
# Entity name            Part name
# ====================   ======================================================
# armor_stand            head, headwear, body, left_arm, right_arm, left_leg, right_leg, right, left, waist, base 
# banner                 slate, stand, top
# bat                    head, body, right_wing, left_wing, outer_right_wing, outer_left_wing
# bed                    head, foot, leg1 ... leg4
# blaze                  head, stick1 ... stick12
# boat                   bottom, back, front, right, left, paddle_left, paddle_right, bottom_no_water
# book                   cover_right, cover_left, pages_right, pages_left, flipping_page_right, flipping_page_left, book_spine
# cat                    back_left_leg, back_right_leg, front_left_leg, front_right_leg, tail, tail2, head, body
# cave_spider            head, neck, body, leg1 ... leg8
# chest                  lid, base, knob
# chest_large            lid_left, base_left, knob_left, lid_right, base_right, knob_right
# chicken                head, body, right_leg, left_leg, right_wing, left_wing, bill, chin
# cod                    body, fin_back, head, nose, fin_right, fin_left, tail
# cow                    head, body, leg1 ... leg4
# creeper                head, armor, body, leg1 ... leg4
# dragon                 head, spine, jaw, body, left_wing, left_wing_tip, right_wing, right_wing_tip,
#                        front_left_leg, front_left_shin, front_left_foot, back_left_leg, back_left_shin, back_left_foot, 
#                        front_right_leg, front_right_shin, front_right_foot, back_right_leg, back_right_shin, back_right_foot
# donkey                 <same as horse>, left_chest, right_chest
# dolphin                body, back_fin, left_fin, right_fin, tail, tail_fin, head
# drowned                head, headwear, body, left_arm, right_arm, left_leg, right_leg
# ender_chest            lid, base, knob
# end_crystal            cube, glass, base
# enderman               head, headwear, body, left_arm, right_arm, left_leg, right_leg
# endermite              body1 ... body4
# evoker                 head, body, arms, left_leg, right_leg, nose, left_arm, right_arm
# evoker_fangs           base, upper_jaw, lower_jaw
# fox                    head, body, leg1 ... leg4, tail
# ghast                  body, tentacle1 ... tentacle9
# giant                  head, headwear, body, left_arm, right_arm, left_leg, right_leg
# guardian               body, eye, spine1 ... spine12, tail1 ... tail3
# head_dragon            head, jaw
# head_player            head
# head_skeleton          head
# head_wither_skeleton   head
# head_zombie            head
# horse                  body, neck, back_left_leg, back_right_leg, front_left_leg, front_right_leg, tail, saddle,
#                        head, mane, mouth, left_ear, right_ear, left_bit, right_bit, left_rein, right_rein, headpiece, noseband,
#                        child_back_left_leg, child_back_right_leg, child_front_left_leg, child_front_right_leg
# illusioner             head, body, arms, left_leg, right_leg, nose, left_arm, right_arm
# iron_golem             head, body, left_arm, right_arm, left_leg, right_leg
# lead_knot              knot
# llama                  head, body, leg1 ... leg4, chest_right, chest_left
# magma_cube             core, segment1 ... segment8
# minecart               bottom, back, front, right, left, dirt
# mooshroom              head, body, leg1 ... leg4
# mule                   <same as horse>, left_chest, right_chest
# ocelot                 back_left_leg, back_right_leg, front_left_leg, front_right_leg, tail, tail2, head, body
# panda                  head, body, leg1 ... leg4
# parrot                 head, body, tail, left_wing, right_wing, left_leg, right_leg
# phantom                body, left_wing, left_wing_tip, right_wing, right_wing_tip, head, tail, tail2
# puffer_fish_big        body, fin_right, fin_left, spikes_front_top, spikes_middle_top, spikes_back_top, spikes_front_right, spikes_front_left, 
#                        spikes_front_bottom, spikes_middle_bottom, spikes_back_bottom, spikes_back_right, spikes_back_left
# puffer_fish_medium     body, fin_right, fin_left, spikes_front_top, spikes_back_top, spikes_front_right, spikes_back_right, spikes_back_left, 
#                        spikes_front_left, spikes_back_bottom, spikes_front_bottom
# puffer_fish_small      body, eye_right, eye_left, tail, fin_right, fin_left
# pig                    head, body, leg1 ... leg4
# piglin                 head, headwear, body, left_arm, right_arm, left_leg, right_leg, left_ear, right_ear
# piglin_brute           head, headwear, body, left_arm, right_arm, left_leg, right_leg, left_ear, right_ear
# pillager               head, body, arms, left_leg, right_leg, nose, left_arm, right_arm
# polar_bear             head, body, leg1 ... leg4
# rabbit                 left_foot, right_foot, left_thigh, right_thigh, body, left_arm, right_arm, head, right_ear, left_ear, tail, nose
# ravager                head, jaw, body, leg1 ... leg4, neck
# salmon                 body_front, body_back, head, fin_back_1, fin_back_2, tail, fin_right, fin_left
# sheep                  head, body, leg1 ... leg4
# sheep_wool             head, body, leg1 ... leg4
# shulker                head, base, lid
# shulker_box            base, lid
# shulker_bullet         bullet
# sign                   board, stick
# silverfish             body1 ... body7, wing1 ... wing3
# skeleton               head, headwear, body, left_arm, right_arm, left_leg, right_leg
# skeleton_horse         <same as horse>
# slime                  body, left_eye, right_eye, mouth
# snow_golem             body, body_bottom, head, left_hand, right_hand
# spawner_minecart       bottom, back, front, right, left, dirt
# spider                 head, neck, body, leg1, ... leg8
# squid                  body, tentacle1 ... tentacle8
# stray                  head, headwear, body, left_arm, right_arm, left_leg, right_leg
# tnt_minecart           bottom, back, front, right, left, dirt
# trapped_chest          lid, base, knob
# trapped_chest_large    lid_left, base_left, knob_left, lid_right, base_right, knob_right
# tropical_fish_a        body, tail, fin_right, fin_left, fin_top
# tropical_fish_b        body, tail, fin_right, fin_left, fin_top, fin_bottom
# turtle                 head, body, leg1 ... leg4, body2
# vex                    head, headwear, body, left_arm, right_arm, left_leg, right_leg, left_wing, right_wing
# villager               head, headwear, headwear2, body, bodywear, arms, left_leg, right_leg, nose
# vindicator             head, body, arms, left_leg, right_leg, nose, left_arm, right_arm
# witch                  head, headwear, headwear2, body, bodywear, arms, left_leg, right_leg, nose, mole
# wither                 body1 ... body3, head1 ... head3
# wither_skeleton        head, headwear, body, left_arm, right_arm, left_leg, right_leg
# wither_skull           head
# wolf                   head, body, leg1 ... leg4, tail, mane
# zombie                 head, headwear, body, left_arm, right_arm, left_leg, right_leg
# zombie_horse           <same as horse>
# zombie_pigman          head, headwear, body, left_arm, right_arm, left_leg, right_leg
# zombie_villager        head, headwear, body, left_arm, right_arm, left_leg, right_leg
# zombified_piglin       head, headwear, body, left_arm, right_arm, left_leg, right_leg, left_ear
#
# Only the elements "models" and "part" are required. 
#
# Note: This is not a valid JSON format and it should only be used as a reference  
######################################################################
{
  "texture": <texture.png>                                              - Texture used by the entity model
  "textureSize": [<width>, <height>],                                   - Texture size in pixels
  "shadowSize": <shadow_size>,                                          - Model shadow size (0.0 - 1.0)
  models                                                                - List of models
  [
    {
      "baseId": <parent_id>,                                            - Model parent ID, all parent properties are inherited
      "model": <model.jpm>,                                             - Part model file, from which to load the part model definition
      "id": <id>,                                                       - Model ID, can be used to reference the model as parent
      "part": <part>,                                                   - Entity part to which the part model is atached 
      "attach": <true|false>,                                           - True: attach to the entity part, False: replace it
      "scale": <scale>,                                                 - Render scale, default is 1.0
      # Part Model definition, see "cem_part.txt" for details           - Part model definition (inline)
      "animations":
      [
        {
          "variable1": "expression1",                                   - See "cem_animation.txt" for details
          "variable2": "expression2,
          ...
        }
      ]
      ...
    },
    ...
  ]
}
######################################################################
# Custom Entity Model Animations
# Reference configuration for OptiFine's feature Custom Entity Models
######################################################################
# Each model variable which is to be animated is assigned an expression. 
# The expression is evaluated every time the model is rendered and its value is assigned to the variable.
# The variables and expressions are defined in the "animation" section of the json entity model (JEM).
#  
#  "animations":
#  [
#    {
#      "variable1": "expression1",    
#      "variable2": "expression2,
#      ...
#    }
#  ]
# 
# 
# Variables
# Model variables are specified in the format 
#   "<model>.<variable_name>"
#
# The model can be:
#  "this" - current custom model
#  "part" - the original part model to which the custom model is attached
#  "<part>" - original model by part name  
#  "<id>" - custom model by ID
#  "<part>:<sub_id>:<sub_sub_id>:..." - (hierarchical) start with original model by part name, then find children by ID
#  "<id>:<sub_id>:<sub_sub_id>:..." - (hierarchical) start with model by ID, then find children by ID
#
# The first model found by part name or ID is used if there are duplicates.
# The model search by ID is deep, also when used in a hierarchical specification. 
#
# The hierarchical specification allows model groups (json part models) to be reused for different parts. 
# For example one hand model ("shoulder:upper_arm:elbow:forearm:palm:finger[1.5]" can be used for both left and right hand.
# The animation can use "left_hand:finger1" for the left thumb and "right_hand:finger1" for the right thumb. 
# The intermediate parents in the hierarchical specification can be skipped. 
#
# Variable names
#   tx, ty, tz - translation x, y, z
#   rx, ry, rz - rotation x, y, z
#   sx, sy, sz - scale x, y, z
# 
# Expressions
#
# Expressions are general mathematical expressions with brackets, constants, variables, operators and functions.
#
# Constants
#   floating point number
#   pi - 3.1415926
#   true
#   false
#
# Variables
#   <model>.<var> - model variable, see the model variable specification
#   time - current world time in ticks
#
# Render parameters
#   limb_swing - limb animation counter
#   limb_speed - limb movement speed
#   age - age in ticks
#   head_yaw - head yaw
#   head_pitch - head pitch
#
# Entity parameters (float)
#   health
#   hurt_time
#   idle_time
#   max_health
#   move_forward
#   move_strafing
#   pos_x, pos_y, pos_z
#   revenge_time
#   swing_progress
#
# Entity parameters (boolean)
#   is_alive
#   is_burning
#   is_child
#   is_glowing
#   is_hurt
#   is_in_lava
#   is_in_water
#   is_invisible
#   is_on_ground
#   is_ridden
#   is_riding
#   is_sneaking
#   is_sprinting
#   is_wet
#
# Operators
#   +, -, *, /, %
#   !, &&, || 
#   >, >=, <, <=, ==, !=
#
# Functions
#   sin(x)
#   cos(x)
#   asin(x)
#   acos(x)
#   tan(x)
#   atan(x)
#   atan2(y, x)
#   torad(deg)
#   todeg(rad)
#   min(x, y ,...)
#   max(x, y, ...)
#   clamp(x, min, max)                             Limits a value to be between min and max values
#   abs(x)
#   floor(x)
#   ceil(x)
#   exp(x)
#   frac(x)
#   log(x)
#   pow(x)
#   random(x)
#   round(x)
#   signum(x)
#   sqrt(x)
#   fmod(x, y)                                     Similar to Math.floorMod()
#   if(cond, val, [cond2, val2, ...], val_else)    Select a value based one or more conditions
#
# Boolean functions                 
#   between(x, min, max)                           Check if a value is between min and max values
#   equals(x, y, epsilon)                          Compare two float values with error margin
#   in(x, val1, val2, ...)                         Check if a value equals one of several values
#
#  Example:
#    ...
#    "animations":
#    [
#      {
#        "this.rx": "clamp(-0.5 * part.rx, 0, 90)",
#        "this.tx": "3 * sin(limb_swing / 4) - 2",
#        "this:Hoof.rx": "if(leg4:Hoof.rx > 90, leg4:Hoof.rx - 90, 0)"
#        ...
#      }
#    ]
#    
###############################################################################
# Sample configuration for OptiFine's Custom Blocks feature.
###############################################################################
# block.properties
###############################################################################
# This file is offered without any copyright restrictions. 
# Please copy and modify it to suit your needs.
#
# Location: "/assets/minecraft/optifine/block.properties"
#

# Render layer (optional)
# Defines custom render layer for the given blocks
# Layers
#   solid - no alpha, no blending (solid textures)
#   cutout - alpha, no blending (cutout textures)
#   cutout_mipped - alpha, no blending, mipmaps (cutout with mipmaps)
#   translucent - alpha, blending, mipmaps (water, stained glass)
# 
# Blocks which are solid opaque cubes (stone, dirt, ores, etc) can't be rendered on a custom layer
# as this would affect face culling, ambient occlusion, light propagation and so on.
#
# For exaple:
#   layer.translucent=glass_pane fence wooden_door
# 
layer.solid=<blocks>
layer.cutout=<blocks>
layer.cutout_mipped=<blocks>
layer.translucent=<blocks>
 
===============================================
Description of OptiFine's Custom Biome Palettes
Based on McPatcher's Custom Biome Palettes
===============================================

Custom Biome Palettes
=====================

In vanilla Minecraft, the grass and leaf textures vary in color depending on the climate of the surrounding biome. 
This is controlled by two files,

  assets/minecraft/textures/colormap/grass.png
  assets/minecraft/textures/colormap/foliage.png

Each file is a 256x256 colormap applied to the base grass or leaf texture (which is usually grey).

OptiFine greatly expands this functionality to other blocks and to ambient sky and fog colors. 
Artists can use this to great effect to give each biome its own feel.

This page is divided into two sections. The first describes the colormap formats themselves, 
and the second shows how to apply them to various elements of the game world.

Vanilla colormap format
=======================

The format used by vanilla Minecraft is a 256x256 colormap with the axes representing temperature and humidity. 
Each biome has fixed base temperature and humidity values corresponding to a single pixel in the colormap. 
As the y coordinate increases, the position in the colormap slowly moves toward the lower right. 
A forum post by khanador illustrates how this works: 
http://www.minecraftforum.net/forums/mapping-and-modding/resource-packs/resource-pack-discussion/1256322-new-biome?comment=124

The vanilla format is used for all custom colormaps as well, unless you override this behavior.

OptiFine "grid" format
=======================

An alternative format that offers finer control over each biome. It is detailed on its own page:
https://bitbucket.org/prupe/mcpatcher/wiki/Biome_Palettes_(Grid)

Other formats
=============

Additionally, OptiFine offers a simple "fixed" colormap format. This format does not require an image; 
it is simply a single color applied to all blocks regardless of location. 
Its primary purpose is to override certain hardcoded block colors like reeds (sugar cane).

Properties file format (colormap.properties)

A custom colormap can consist of either a ".png" file, a properties file, or both depending on what you're trying to do. 
All of the properties are optional and in fact the entire properties file can be omitted if you do not need to change any of them.

(Optional) Colormap format
==========================

  # Colormap format
  format=<vanilla | grid | fixed>

If omitted, the default format is vanilla. If you'd rather use grid format by default, 
you can set it globally in the "assets/minecraft/optifine/color.properties" file:

  # Grid format
  palette.format=grid

Note that this setting does not affect the vanilla "grass.png" and "foliage.png" files in "assets/minecraft/textures/colormap". 
Those are always interpreted in the vanilla format in order to preserve compatibility for non-OptiFine users. 
See "Grass and foliage" below for how to use the grid format with these textures.

(Optional) List of blocks with optional properties
==================================================

  # List of blocks with optional properties
  blocks=<list>

For colormaps applied to terrain (as opposed to fog, sky, and underwater), this is a list of blocks 
and optional property values to apply the map to. If this property is not specified, the block name is taken from the filename 
(e.g., "cobblestone.properties" -> "blocks=minecraft:cobblestone").

See About Properties Files (properties_files.txt) for the syntax.

  # For example:
  blocks=stone minecraft:sand minecraft:lever:face=wall:facing=east,west

(Optional) Colormap image
=========================

  # Colormap image
  source=<image>

For vanilla and grid colormaps only. The path to the image containing the colormap. 
If this property is omitted, it defaults to a png with the same name and directory as the properties file itself, 
e.g., "stone.properties" -> "source=stone.png".

(Optional) Default color
========================

  # Default color
  color=<rgb value>

For "format=fixed", this is simply the fixed color to be applied to all matching blocks. 
If no value is given, the default is white "ffffff".

For "format=vanilla" or "format=grid", this color is used for held or dropped blocks. 
If no value is given, the default color is instead taken from a fixed location depending on the format:

  # Format
  format=vanilla: x=127,y=127 (Center of bitmap)
  format=grid: x=1,y=64 (Plains biome at sea level)

Applying a custom colormap
==========================

Custom colormaps can be applied to any block or set of blocks. 
They can also be applied to ambient fog, sky, and underwater colors.

Block-based colormaps can be applied in one of two ways: 
- as a list in "assets/minecraft/optifine/color.properties" 
- as separate files under "assets/minecraft/optifine/colormap/blocks".

For the first method, use the syntax
  
  # Custom colormap 
  palette.block.<colormap image>=<list of blocks + properties>

For example, this assigns the four basic types of leaves their own colormaps:

  # Custom colormap 
  palette.block.~/colormap/oak.png=oak_leaves
  palette.block.~/colormap/tall_grass_up.png=tall_grass:half=upper
  palette.block.~/colormap/tall_grass_low.png=tall_grass:half=lower

Two limitations of this method: 
- the source and blocks properties can be set; the rest are defaults. 
- if the player is using multiple resource packs, only the first color.properties file will be read by the game.

An alternative way is by using separate files under "assets/minecraft/optifine/colormap/blocks". 
Subfolders are allowed and are useful to make organization easier. The above example could also be done this way:

In "assets/minecraft/optifine/colormap/blocks/oak.properties":

  # Oak colormap
  blocks=oak_leaves

In "assets/minecraft/optifine/colormap/blocks/tall_grass_up.properties":

  # Pine colormap
  blocks=tall_grass:half=upper

In "assets/minecraft/optifine/colormap/blocks/tall_grass_low.properties":

  # Pine colormap
  blocks=tall_grass:half=lower

This is assuming you have "oak.png", "tall_grass_up.png" and "tall_grass_low.png" in the same folder.

Single block
============

The simplest case, a custom colormap applied to a single block type with no property values, it does not need a properties file. 
For example, "assets/minecraft/optifine/colormap/blocks/sand.png" applies to sand blocks without the need to specify "blocks=sand".

Multiple blocks
===============

To apply the same colormap to all stone and ore blocks, use a properties file

In "assets/minecraft/optifine/colormap/blocks/stone_and_ore.properties":

  # Stone and ore colormaps
  blocks=stone gold_ore iron_ore coal_ore lapis_ore diamond_ore redstone_ore redstone_ore:lit=true emerald_ore

Add "format=grid" if using the new format. The source property is unnecessary if the colormap is also named "stone_and_ore.png".

In "color.properties" this can also be written as:

  # Stone and ore colormaps
  palette.block.~/colormap/custom/stone.png=stone gold_ore iron_ore coal_ore lapis_ore diamond_ore redstone_ore redstone_ore:lit=true emerald_ore

Add "palette.format=grid" to use grid format for all your custom colormaps (except the vanilla "grass.png" and "foliage.png").

Grass and foliage
=================

Custom colormaps will override the vanilla grass.png and foliage.png. 
This means you can leave your vanilla maps in place for compatibility and create custom ones for OptiFine users:

In "assets/minecraft/optifine/colormap/blocks/grass.properties":

  # Grass colormap
  format=grid
  # NOTE: "blocks=grass" not needed since it is in the filename
  yVariance=2

In "assets/minecraft/optifine/colormap/blocks/oak.properties":

  # Oak colormap
  format=grid
  blocks=oak_leaves

Fixing reeds (sugar cane) in 1.7

Starting in 1.7, Minecraft applies the "grass.png" color to reeds, much to the annoyance of many artists. 
A "fixed" colormap of "ffffff" (white) effectively reverts to the 1.6 behavior. 
A 256x256 all-white colormap would of course accomplish the same thing, but this method is more efficient. 
The simplest way to do this is to create a properties file containing just one line:

In "assets/minecraft/optifine/colormap/blocks/reeds.properties":

  # Reeds colormap
  format=fixed

This works because the blocks property defaults to the filename (reeds) and the color property defaults to "ffffff" for fixed colormaps.

Ambient fog, sky, and underwater colors
=======================================

These specifically named colormaps override the default fixed ambient colors:

    Overworld fog: "assets/minecraft/optifine/colormap/fog0.png"
    Overworld sky: "assets/minecraft/optifine/colormap/sky0.png"
    Underwater: "assets/minecraft/optifine/colormap/underwater.png"

Each one can have a corresponding properties file to specify the format or other settings. 
These colormaps behave just as terrain-based ones except that they do not care about the blocks property.

References
==========
https://bitbucket.org/prupe/mcpatcher/wiki/Biome_Palettes
http://www.minecraftforum.net/forums/mapping-and-modding/resource-packs/resource-pack-discussion/1256322-new-biome?comment=124
=============================================================
Description of OptiFine's Custom Biome Palettes (Grid format)
Based on McPatcher's Custom Biome Palettes
=============================================================

Custom Biome Palettes (Grid format)
===================================

The vanilla colormap format has a few drawbacks. 
First some biomes like desert are represented by only a single pixel in the colormap, which means their color cannot vary by height. 
Further, multiple biomes share their temperature and humidity values, making it impossible to give them different color schemes. 
Even when the base values are different, biomes sometimes overlap at higher altitudes.

OptiFine offers an alternative, first proposed by Misa. Like the vanilla maps, it is -- generally, see Tips below -- a 256x256 colormap, 
but the x coordinate represents the biome ID number and the y coordinate the height. (See the Minecraft Wiki for a list of biome IDs.) 
This allows complete separation between biomes and gives you full control from bedrock to max build height.

Layout
======

Each column in the colormap represents a single biome. Please note that the image is "flipped" vertically: 
The bottom of the world (y=0) is at the top of the image and the max build height (y=255) is at the bottom. 
Sea level is y=64. Generally, you will make each column some sort of gradient.

Template (images/biome/grid/template.png)

Properties file format (colormap.properties)

(Optional) Format indicator
===========================

This property simply distinguishes grid-formatted colormaps from vanilla ones. 
If not specified, your grid colormap will be interpreted in vanilla temperature+humidity format, leading to strange results.

  # Grid format
  format=grid

The format property can be omitted if you set it globally in the "assets/minecraft/optifine/color.properties" file:

  # Grid format
  palette.format=grid

This makes all your custom colormaps use the grid format, so be sure that this is what you want.

(Optional) List of blocks with optional properties
==================================================

  # Blocks
  # For example:
  #   blocks=stone minecraft:sand minecraft:lever:face=wall:facing=east,west
  blocks=<list>

See Biome Palettes (biome_palettes.txt).

(Optional) Colormap image
=========================

  # Image
  source=<image>

See Biome Palettes.

(Optional) Default color
========================

  # Color
  color=<rgb value>

See Biome Palettes.

(Optional) y variance
======================

If set, this property adds random noise to the y coordinate before sampling from the colormap, giving flat areas a more varied appearance. 
A value of 2 causes the game to pick a value between y - 2 and y + 2, for example.

  # Y variance
  yVariance=<value>

The default value is 0 (no variation).

This property can also be set globally in "assets/minecraft/optifine/color.properties":

  # Y variance
  palette.yVariance=<value>

(Optional) y offset
===================
  
  # Y offset
  yOffset=<value>

This subtracts a fixed value from the block's y coordinate before sampling from the colormap. 
For example a value of 64 will use the pixel at 0 for blocks between layers 0 and 64. A block at 65 will use pixel 1, 66 pixel 2, etc.

The default value is 0 (no offset).

Tips
====

Forward compatibility: Unused columns in the map represent unassigned biome IDs that may be used by either by future Minecraft versions or by mods. 
Of course you can create color schemes for particular mod biomes if you know the IDs that they use. But even if you don't, 
it is best to at least pick a neutral-looking gradient for unused columns so that new biomes will have a reasonable default appearance.

Backward compatibility: The vanilla "grass.png" and "foliage.png" maps in "assets/minecraft/textures/colormap" are always in the vanilla format, 
regardless of any properties file setting. This preserves compatibility for non-OptiFine users. 
To use the grid format with grass or leaves, you must create a custom colormap in "assets/minecraft/optifine/colormap/blocks" 
and apply it to the appropriate block(s). For OptiFine users, the custom colormap overrides the vanilla one; 
for non-OptiFine users, only the vanilla one will be used.

Resolution: While colormaps in this format are generally 256x256, there is no strict requirement as with the vanilla format:

Minecraft 1.7 introduced rare variants of many biomes. For example "Birch Forest M" (ID 155) is the rare version of "Birch Forest" (ID 27). 
Conveniently, the rare is always common + 128. This fact can be exploited if you want all rare biomes to use the same color schemes 
as the corresponding non-rare ones. Simply make your colormap 128 pixels wide instead of 256, and OptiFine will "wrap" it 
in the x direction when assigning columns to biomes.
Similarly, a 1-pixel wide colormap gives you the same height-based color gradient across all biomes.
In the y direction, if you provide more than 256 pixels, OptiFine will happily use them if the server's build height is higher than the default. 
Similarly, if the colormap is shorter than 256 pixels, it will simply "top out" at that height giving all blocks above that the same color.
In particular, a height of 64 pixels allows for variation underground and a fixed color above sea level.
A height of 192 pixels combined with a setting of yOffset=64 gives you just the opposite: variation above ground and a fixed color below.
A height of 1 pixel allows for variation across biomes but not by height.

References
==========
https://bitbucket.org/prupe/mcpatcher/wiki/Biome_Palettes_(Grid)
http://www.minecraftforum.net/forums/mapping-and-modding/resource-packs/resource-pack-discussion/1255785-b?comment=124
# Configuration for OptiFine's Better Grass feature
# Location: /assets/minecraft/optifine/bettergrass.properties

# Blocks
# Enable Better Grass for specific blocks
grass=true
grass_path=true
mycelium=true
podzol=true

# Snowy blocks
# Enable Better Grass for specific blocks which have snow on top
grass.snow=true
mycelium.snow=true
podzol.snow=true

# Multilayer grass sides
# - layer 1 = grass_side
# - layer 2 = grass (colored by biome)
# Allows transparent grass texture to be used as overlay for the grass side
grass.multilayer=false

# Textures
# Configure which textures to be used 
# The "texture.grass" is colored by biome
texture.grass=block/grass_block_top
texture.grass_side=block/grass_block_side
texture.grass_path=block/grass_path_top
texture.grass_path_side=block/grass_path_side
texture.mycelium=block/mycelium_top
texture.podzol=block/podzol_top
texture.snow=block/snow





###############################################################################
# Sample configuration for OptiFine's Custom Panorama feature.
###############################################################################
# background.properties
###############################################################################
# This file is offered without any copyright restrictions. Please copy and
# modify it to suit your needs.
#
# Location: "/assets/minecraft/optifine/gui/background.properties"
# Controls the behaviour of the main menu panorama
# 
# Alternative panorama folders:
#   /assets/minecraft/optifine/gui/background1 
#   /assets/minecraft/optifine/gui/background2 
#   /assets/minecraft/optifine/gui/background3 
#   ...
#
# The alternative panorama folders should contain the following textures
#   panorama_0.png 
#   panorama_1.png 
#   panorama_2.png 
#   panorama_3.png 
#   panorama_4.png 
#   panorama_5.png
# 
# The alternative panorama folders can include "background.properties" to
# define custom properties for the panorama

# Weight (optional)
# Weight for the random selection, higher weights will be selected more often
# Default is 1
weight=<weight> 

# Blur level (optional)
# The main menu background uses 3 types of blur 
# Higher blur levels may decrease the main menu FPS 
blur1=<1-64>
blur2=<1-3>
blur3=<1-3>

# Overlay colors (optional)
# There are 2 gradient overlays drawn over the background image
# When the top and bottom colors are 0 the overlay is disabled 
# The color format is ARGB (hex)
# Default values are shown below
overlay1.top=80FFFFFF
overlay1.bottom=00FFFFFF
overlay2.top=00000000
overlay2.bottom=80000000
