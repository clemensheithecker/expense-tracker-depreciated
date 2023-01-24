import { Dialog } from '@headlessui/react';
import Modal from '~/components/Modal';
import SelectInput from './Form/SelectInput';
import InputWithAddOn from './Form/InputWithAddOn';
import Input from './Form/Input';
import Textarea from './Form/Textarea';

const AddTransactionModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-start">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6">
          Add New Transaction
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add a new transaction to your account.
            {/* Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ipsa libero labore natus, voluptatum,
            quod voluptates, quos quia voluptatibus quibusdam tempora quas.
            Quisquam, quod. Quod, quia */}
          </p>
        </div>
        <div className="mt-5 md:col-span-2">
          <form action="#" method="POST">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <SelectInput
                  label="Account"
                  name="account"
                  options={['Household', 'Car', 'Travel']}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <InputWithAddOn
                  label="Amount"
                  name="amount"
                  placeholder="0.00"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                >
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  id="date"
                  autoComplete="date"
                  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                >
                  Time
                </label>
                <input
                  type="text"
                  name="time"
                  id="time"
                  autoComplete="time"
                  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <Input label="Involved party" name="involved-party" />
              </div>

              <div className="col-span-6">
                <Textarea
                  label="Note"
                  name="note"
                  placeholder="You can add a note here."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your transaction.
                </p>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <SelectInput
                  label="Payment method"
                  name="payment-method"
                  options={['Cash', 'PayPal']}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddTransactionModal;
