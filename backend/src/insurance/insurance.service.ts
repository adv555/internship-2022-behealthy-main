import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { Insurance } from './entities/insurance.entity';
import { UpdateInsurance } from './dto/update-insurance.dto';
import { CreateInsurance } from './dto/create-insurance.dto';

@Injectable()
export class InsuranceService {
  constructor(
    @Inject(REPOSITORY.INSURANCE)
    private insuranceRepository: typeof Insurance,
  ) {}

  async getAllInsurancePatient() {
    return await this.insuranceRepository.findAll();
  }

  async getInsurancePatient(id: number) {
    return await this.insuranceRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createInsurancePatient(dtoInsurance: CreateInsurance) {
    return await this.insuranceRepository.create(dtoInsurance);
  }

  async updateInsurancePatient(id: number, dtoInsurance: UpdateInsurance) {
    return await this.insuranceRepository.update(dtoInsurance, {
      where: { id: id },
    });
  }

  async deleteInsurancePatient(id: number) {
    return await this.insuranceRepository.destroy({
      where: { id: id },
    });
  }
}
