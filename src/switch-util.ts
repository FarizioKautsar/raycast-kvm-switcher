import { showHUD, showToast, Toast, Clipboard, open } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const envPath = 'export PATH="$PATH:/opt/homebrew/bin:/usr/local/bin"';

export async function switchMonitorInput(inputCode: string | number, inputName: string) {
  const switchCommand = `${envPath} && m1ddc set input ${inputCode}`;

  try {
    await execAsync(switchCommand);
    await showHUD(`🖥️ Switched to ${inputName}`);
  } catch (error) {
    if ((error as Error).message.includes("command not found")) {
      const toast = await showToast({
        style: Toast.Style.Animated,
        title: "Checking dependencies...",
        message: "Looking for Homebrew.",
      });

      try {
        await execAsync(`${envPath} && which brew`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        // HOMEBREW IS MISSING: Handle gracefully
        toast.style = Toast.Style.Failure;
        toast.title = "Homebrew is Missing";
        toast.message = "You need Homebrew to install m1ddc.";

        toast.primaryAction = {
          title: "Copy Brew Install Command",
          onAction: (toastToHide) => {
            Clipboard.copy(
              '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
            );
            toastToHide.hide();
            showHUD("Copied Homebrew command to clipboard. Please run it in your terminal.");
          },
        };

        toast.secondaryAction = {
          title: "Open brew.sh",
          onAction: () => open("https://brew.sh"),
        };

        return;
      }

      toast.title = "Installing m1ddc...";
      toast.message = "Fetching from Homebrew. This might take a moment.";

      try {
        await execAsync(`${envPath} && brew install m1ddc`);

        toast.style = Toast.Style.Success;
        toast.title = "Installation Complete";
        toast.message = "Executing monitor switch...";

        await execAsync(switchCommand);
        await showHUD(`🖥️ Switched to ${inputName}`);
      } catch (installError) {
        toast.style = Toast.Style.Failure;
        toast.title = "Installation Failed";
        toast.message = "Could not install m1ddc via Homebrew.";

        toast.primaryAction = {
          title: "Copy Error Log",
          onAction: (toastToHide) => {
            Clipboard.copy(String(installError));
            toastToHide.hide();
            showHUD("Error log copied to clipboard");
          },
        };
      }
    } else {
      const errorToast = await showToast({
        style: Toast.Style.Failure,
        title: "Failed to switch input",
        message: "Monitor may be unresponsive or DDC failed.",
      });

      errorToast.primaryAction = {
        title: "Copy Error Log",
        onAction: (toastToHide) => {
          Clipboard.copy(String(error));
          toastToHide.hide();
          showHUD("Error log copied to clipboard");
        },
      };
    }
  }
}
