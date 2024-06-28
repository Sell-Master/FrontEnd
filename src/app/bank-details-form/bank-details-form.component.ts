import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

@Component({
  selector: 'app-bank-details-form',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatError,
    ReactiveFormsModule 
  ],
  templateUrl: './bank-details-form.component.html',
  styleUrls: ['./bank-details-form.component.css']
})
export class BankDetailsFormComponent {
  bankDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BankDetailsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bankDetailsForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      año: ['', [Validators.required, Validators.min(new Date().getFullYear()), Validators.max(new Date().getFullYear() + 20)]]
    });
  }

  onSave(): void {
    if (this.bankDetailsForm.valid) {
      this.dialogRef.close(this.bankDetailsForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
