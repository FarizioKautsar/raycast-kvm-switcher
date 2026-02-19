# KVM Switcher

A cross-platform KVM switcher for **macOS** and **Windows**, designed for displays with built-in KVM and DDC/CI support. Seamlessly switch between HDMI, DisplayPort, and Type-C (DisplayPort) inputs using Raycast.

## ⚙️ Prerequisites & Setup

This extension is designed to be as "zero-config" as possible for both platforms.

### For macOS
The extension relies on a lightweight tool called `m1ddc`.
* **Auto-Install:** The extension will attempt to install this for you automatically via Homebrew the first time you run a command.
* **Requirement:** You must have **[Homebrew](https://brew.sh/)** installed on your Mac.

### For Windows
* **Zero-Install:** There are **no external tools to download or install.**
* **Native Execution:** The extension uses a native C# script executed via PowerShell to communicate directly with your monitor's hardware APIs (`dxva2.dll`). This works out-of-the-box on a clean Windows 10 or 11 installation.

---

## Supported Input Codes (Cheat Sheet)

Finding the exact code for your monitor's input ports requires a little trial and error, as manufacturers often assign them differently. Below are the most common industry-standard DDC/CI Virtual Control Panel (VCP) codes:

| Input Type | Common VCP Codes |
| :--- | :--- |
| **DisplayPort 1** | `15` |
| **DisplayPort 2** | `16` |
| **HDMI 1** | `17` |
| **HDMI 2** | `18` |
| **USB-C / Type-C** | `18`, `27`, or `15`* |

**Note for USB-C Users:** Many monitors (like the MSI Modern series) treat the USB-C port as a DisplayPort internally. If your USB-C isn't responding to code `18`, try code `15`.

---

## ⚠️ Hardware Compatibility & Limitations

This extension sends hardware commands directly to your monitor's internal firmware using the **DDC/CI** (Display Data Channel Command Interface) protocol.

* **Enable DDC/CI:** You *must* manually enable "DDC/CI" or "PC Control" inside your monitor's physical OSD (On-Screen Display) menu.
* **Apple Silicon Native HDMI Port:** On Mac M-series chips, DDC/CI communication is often blocked on the built-in HDMI port. For best results, connect via USB-C, Thunderbolt, or a USB-C to DP/HDMI adapter.
* **Cables & Hubs:** Certain USB-C hubs and "passive" adapters do not pass DDC/CI signals. If the extension is failing, try connecting the monitor directly to your computer.

---

## 🖥 Known Compatible Monitors

This extension works with any monitor that correctly implements standard VESA MCCS input switching, including:

* **MSI:** Modern Series (e.g., MD272QXPW, MD272PW, MD272QXP)
* **Dell:** UltraSharp Series (e.g., U2723QE, U3223QE) and P-Series (e.g., P2722HE)
* **Gigabyte:** M-Series (e.g., M27Q, M32U, M34WQ)
* **BenQ / ASUS / AOC:** Various productivity models with built-in KVM switches.

---

## Technical Implementation (For Reviewers)

To ensure a seamless cross-platform experience without bundling suspicious binaries:

- **macOS:** Uses `child_process` to execute `m1ddc` via shell. Includes an auto-dependency checker for Homebrew.
- **Windows:** Reads a local `MonitorSwitcher.cs` asset and executes it via PowerShell's `Add-Type` functionality. This compiles the C# code in memory at runtime to call `SetVCPFeature` from `dxva2.dll`. This approach avoids the need for external `.exe` files.