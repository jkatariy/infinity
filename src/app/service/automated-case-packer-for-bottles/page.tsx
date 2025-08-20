import { redirect } from 'next/navigation';

export default function AutomatedCasePackerForBottlesPage() {
  // Note: ICP-B200 doesn't seem to exist in the current structure, 
  // so redirecting to the main case packers page
  redirect('/products/case-packers');
}
