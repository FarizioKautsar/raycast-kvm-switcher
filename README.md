# KVM Switcher

KVM switcher for macOS designed for displays with built-in KVM and DDC/CI support. Supports monitors with HDMI, DisplayPort, and Type-C (DisplayPort) inputs (e.g., MSI Modern Series monitors).

## ⚙️ Prerequisites

This extension relies on a lightweight macOS command-line tool called `m1ddc` to send hardware signals to your monitor. 

The extension will attempt to install this dependency for you automatically the first time you run a command. For this to work, **you must have [Homebrew](https://brew.sh/) installed on your Mac.**

If you do not have Homebrew installed, open your Terminal and run:
\`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\`

## 🛠 Supported Input Codes (Cheat Sheet)

Finding the exact code for your monitor's input ports requires a little trial and error, as manufacturers often assign them differently. Below are the most common industry-standard DDC/CI Virtual Control Panel (VCP) codes:

* **DisplayPort 1:** `15` 
* **DisplayPort 2:** `16`
* **HDMI 1:** `17`
* **HDMI 2:** `18`
* **USB-C:** `15`, `27`, or `11`

**Note for USB-C Monitors:** Because USB-C carries video using "DisplayPort Alternate Mode," many monitors (like the MSI Modern MD272 series) wire the USB-C port as their primary DisplayPort internally. This means your USB-C port will likely use code `15`, which pushes your physical DisplayPort to `16` or `18`.

## ⚠️ Limitations & Compatibility

This extension sends raw hardware commands directly to your monitor's internal firmware using a protocol called **DDC/CI** (Display Data Channel Command Interface). Because it relies on physical hardware communication, there are a few limitations to keep in mind:

* **Monitor Support:** Your monitor *must* explicitly support DDC/CI. For most modern smart monitors, you need to manually enable "DDC/CI" or "PC Control" inside your monitor's physical OSD (On-Screen Display) menu before this extension will work. 
* **Apple Silicon Native HDMI Port:** If you are using a Mac with an M-series chip, DDC/CI communication is often blocked at the firmware level when using the Mac's built-in, native HDMI port. For reliable DDC/CI control on Apple Silicon, you should connect your monitor via a USB-C cable, a high-quality Thunderbolt dock, or a USB-C to DisplayPort/HDMI adapter.
* **Cheap Hubs & Docks:** Certain USB-C hubs, cheap adapters, and DisplayLink-based docks act as a barrier and do not pass DDC/CI signals through to the monitor. If the extension is failing silently, try connecting the monitor directly to your Mac to verify.

## 🖥 Known Compatible Monitors

This extension will work with any external monitor that correctly implements standard DDC/CI VCP input switching. Models known to feature built-in KVMs that benefit heavily from this extension include:

* **MSI:** Modern Series (e.g., MD272QXPW, MD272PW, MD272QXP)
* **Dell:** UltraSharp Series (e.g., U2723QE, U3223QE, U2724DE) and P-Series (e.g., P2722HE)
* **AOC:** Selected productivity models (e.g., U27N3R, Q32P2C)
* **Gigabyte / ASUS / BenQ:** Various models with built-in KVM switches