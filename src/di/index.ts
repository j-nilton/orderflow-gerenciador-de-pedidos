import { MockAuthService } from '../infra/services/MockAuthService';
import { MockTableService } from '../infra/services/MockTableService';
import { MockOrderService } from '../infra/services/MockOrderService';
import { MockProductService } from '../infra/services/MockProductService';
import { AuthUseCase } from '../usecase/AuthUseCase';
import { TableUseCase } from '../usecase/TableUseCase';
import { OrderUseCase } from '../usecase/OrderUseCase';
import { ProductUseCase } from '../usecase/ProductUseCase';
import { MockAccessCodeService } from '../infra/services/MockAccessCodeService';
import { AccessCodeUseCase } from '../usecase/AccessCodeUseCase';

const authService = new MockAuthService();
const tableService = new MockTableService();
const orderService = new MockOrderService();
const productService = new MockProductService();
const accessCodeService = new MockAccessCodeService();

const authUseCase = new AuthUseCase(authService);
const tableUseCase = new TableUseCase(tableService, orderService, authService);
const orderUseCase = new OrderUseCase(orderService, tableService);
const productUseCase = new ProductUseCase(productService);
const accessCodeUseCase = new AccessCodeUseCase(accessCodeService);

export { authUseCase, tableUseCase, orderUseCase, productUseCase, accessCodeUseCase };
