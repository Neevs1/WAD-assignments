import { importProvidersFrom } from '@angular/core';
import { provideForms } from '@angular/forms';
export const appModuleConfig = {
    providers: [importProvidersFrom(provideForms())]
};
//# sourceMappingURL=app.module.js.map