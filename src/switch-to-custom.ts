import { getPreferenceValues } from "@raycast/api";
import { switchMonitorInput } from "./switch-util";

interface Preferences {
  customCode: string;
}

export default async function main() {
  const { customCode } = getPreferenceValues<Preferences>();

  await switchMonitorInput(customCode, `Custom (${customCode})`);
}
