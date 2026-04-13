import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

export const appModuleConfig = {
  providers: [importProvidersFrom(FormsModule)]
};
