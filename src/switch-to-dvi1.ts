import { switchMonitorInput } from "./switch-util";

export default async function main() {
  await switchMonitorInput(3, "VGA 2");
}
