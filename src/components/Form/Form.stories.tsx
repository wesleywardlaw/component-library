import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { Form } from './index'
import { Switch } from './Switch'
import { FileInput } from './FileInput'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
}

export default meta

type Story = StoryObj<typeof Form>

export const BasicForm: Story = {
  render: () => (
    <Form
      schema={z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(6, 'Password too short'),
        acceptTerms: z.literal(true, {
          errorMap: () => ({ message: 'You must accept the terms and conditions' }),
        }),
        interests: z.array(z.string()).min(1, 'Select at least one interest'),
      })}
      onSubmit={async (data: { email: string; password: string }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='email'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Input
          name='email'
          type='email'
          placeholder='Enter your email'
        />
        <Form.Error name='email' />
      </Form.Field>

      <Form.Field
        name='password'
        className='mb-4'
      >
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Input
          name='password'
          type='password'
          placeholder='Enter your password'
        />
        <Form.Error name='password' />
      </Form.Field>

      <Form.Field name='interests'>
        <Form.CheckboxGroup
          name='interests'
          legend='Your interests'
          orientation='horizontal'
          options={[
            { value: 'tech', label: 'Technology' },
            { value: 'sports', label: 'Sports' },
            { value: 'music', label: 'Music' },
            { value: 'travel', label: 'Travel' },
          ]}
        />
        <Form.Error name='interests' />
      </Form.Field>

      <Form.Field name='acceptTerms'>
        <Form.Checkbox
          name='acceptTerms'
          label='I accept the terms and conditions'
        />
        <Form.Error name='acceptTerms' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const FieldErrorSubmission: Story = {
  render: () => (
    <Form
      schema={z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(6, 'Password too short'),
      })}
      onSubmit={async () => {
        return {
          errors: {
            email: ['This email is already in use'],
          },
        }
      }}
    >
      <Form.Field name='email'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Input
          name='email'
          type='email'
          placeholder='Enter your email'
        />
        <Form.Error name='email' />
      </Form.Field>

      <Form.Field
        name='password'
        className='mb-4'
      >
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Input
          name='password'
          type='password'
          placeholder='Enter your password'
        />
        <Form.Error name='password' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const RootErrorSubmission: Story = {
  render: () => (
    <Form
      schema={z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(6, 'Password too short'),
      })}
      onSubmit={async () => {
        return {
          errors: {
            root: ['Submission failed due to server error'],
          },
        }
      }}
    >
      <Form.Field name='email'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Input
          name='email'
          type='email'
          placeholder='Enter your email'
        />
        <Form.Error name='email' />
      </Form.Field>

      <Form.Field
        name='password'
        className='mb-4'
      >
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Input
          name='password'
          type='password'
          placeholder='Enter your password'
        />
        <Form.Error name='password' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const SelectBasic: Story = {
  render: () => (
    <Form
      schema={z.object({
        country: z.string().nonempty('Please select a country'),
      })}
      onSubmit={async (data: { country: string }) => {
        console.log('Selected country:', data)
        return { success: true }
      }}
    >
      <Form.Field
        name='country'
        className='mb-4'
      >
        <Form.Label htmlFor='country'>Country</Form.Label>
        <Form.Select
          name='country'
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'mx', label: 'Mexico' },
          ]}
        />
        <Form.Error name='country' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const SelectWithDefaultValue: Story = {
  render: () => (
    <Form
      schema={z.object({
        country: z.string().nonempty('Please select a country'),
      })}
      onSubmit={async (data: { country: string }) => {
        console.log('Selected country:', data)
        return { success: true }
      }}
    >
      <Form.Field
        name='country'
        className='mb-4'
      >
        <Form.Label htmlFor='country'>Country</Form.Label>
        <Form.Select
          name='country'
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'mx', label: 'Mexico' },
          ]}
          defaultValue='ca'
        />
        <Form.Error name='country' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const SelectWithDisabledOption: Story = {
  render: () => (
    <Form
      schema={z.object({
        country: z.string().nonempty('Please select a country'),
      })}
      onSubmit={async (data: { country: string }) => {
        console.log('Selected country:', data)
        return { success: true }
      }}
    >
      <Form.Field
        name='country'
        className='mb-4'
      >
        <Form.Label htmlFor='country'>Country</Form.Label>
        <Form.Select
          name='country'
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada', disabled: true },
            { value: 'mx', label: 'Mexico' },
          ]}
        />
        <Form.Error name='country' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const RadioGroup: Story = {
  render: () => (
    <Form
      schema={z.object({
        gender: z.string().nonempty('Please select a gender'),
      })}
      onSubmit={async (data: { gender: string }) => {
        console.log('Selected gender:', data)
        return { success: true }
      }}
    >
      <Form.Field name='gender'>
        <Form.Label>Gender</Form.Label>
        <Form.RadioGroup
          name='gender'
          className='mt-2'
        >
          <div className='flex items-center gap-2'>
            <Form.Radio
              id='gender-male'
              value='male'
            />
            <Form.Label htmlFor='gender-male'>Male</Form.Label>
          </div>

          <div className='flex items-center gap-2'>
            <Form.Radio
              id='gender-female'
              value='female'
            />
            <Form.Label htmlFor='gender-female'>Female</Form.Label>
          </div>

          <div className='flex items-center gap-2'>
            <Form.Radio
              id='gender-non-binary'
              value='non-binary'
            />
            <Form.Label htmlFor='gender-non-binary'>Non-binary</Form.Label>
          </div>

          <div className='flex items-center gap-2'>
            <Form.Radio
              id='gender-prefer-not-to-say'
              value='prefer-not-to-say'
            />
            <Form.Label htmlFor='gender-prefer-not-to-say'>Prefer not to say</Form.Label>
          </div>
        </Form.RadioGroup>
        <Form.Error name='gender' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const RadioGroupErrorExample: Story = {
  render: () => (
    <Form
      schema={z.object({
        gender: z.literal('impossible_value', {
          errorMap: () => ({ message: 'This value is not allowed' }),
        }),
      })}
      onSubmit={async (data: { gender: string }) => {
        console.log('Selected gender:', data)
        return { success: true }
      }}
    >
      <Form.Field name='gender'>
        <Form.Label>Gender</Form.Label>
        <Form.RadioGroup
          name='gender'
          className='mt-2'
        >
          <div className='flex items-center gap-2'>
            <Form.Radio
              id='gender-male'
              value='male'
            />
            <Form.Label htmlFor='gender-male'>Male</Form.Label>
          </div>

          <div className='flex items-center gap-2'>
            <Form.Radio
              id='gender-female'
              value='female'
            />
            <Form.Label htmlFor='gender-female'>Female</Form.Label>
          </div>
        </Form.RadioGroup>
        <Form.Error name='gender' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const BasicTextArea: Story = {
  render: () => (
    <Form
      schema={z.object({
        description: z.string().min(10, 'Description must be at least 10 characters long'),
      })}
      onSubmit={async (data: { description: string }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='description'>
        <Form.Label htmlFor='description'>Description</Form.Label>
        <Form.TextArea
          name='description'
          placeholder='Enter a description'
          rows={4}
        />
        <Form.Error name='description' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const TextAreaWithMaxLength: Story = {
  render: () => (
    <Form
      schema={z.object({
        feedback: z.string().max(100, 'Feedback must not exceed 100 characters'),
      })}
      onSubmit={async (data: { feedback: string }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='feedback'>
        <Form.Label htmlFor='feedback'>Feedback</Form.Label>
        <Form.TextArea
          name='feedback'
          placeholder='Enter your feedback'
          maxLength={100}
        />
        <Form.Error name='feedback' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const DisabledTextArea: Story = {
  render: () => (
    <Form
      schema={z.object({
        notes: z.string().optional(),
      })}
      onSubmit={async (data: { notes?: string }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='notes'>
        <Form.Label htmlFor='notes'>Notes</Form.Label>
        <Form.TextArea
          name='notes'
          placeholder='This field is disabled'
          disabled
        />
        <Form.Error name='notes' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const TextAreaWithDescription: Story = {
  render: () => (
    <Form
      schema={z.object({
        bio: z.string().min(20, 'Bio must be at least 20 characters long'),
      })}
      onSubmit={async (data: { bio: string }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='bio'>
        <Form.Label htmlFor='bio'>Bio</Form.Label>
        <Form.TextArea
          name='bio'
          placeholder='Tell us about yourself'
          description='Provide a brief bio of at least 20 characters.'
        />
        <Form.Error name='bio' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const RequiredTextArea: Story = {
  render: () => (
    <Form
      schema={z.object({
        comments: z.string().min(1, 'Comments are required'),
      })}
      onSubmit={async (data: { comments: string }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='comments'>
        <Form.Label htmlFor='comments'>Comments</Form.Label>
        <Form.TextArea
          name='comments'
          placeholder='Enter your comments'
          required
          rows={6}
          autoComplete='on'
        />
        <Form.Error name='comments' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

type SliderStory = StoryObj<{ step: number; min: number; max: number }>

export const BasicSlider: SliderStory = {
  args: {
    step: 1,
    min: 0,
    max: 100,
  },
  render: ({ step, min, max }) => (
    <Form
      schema={z.object({
        volume: z.number().min(min).max(max),
      })}
      onSubmit={async (data: { volume: number }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='volume'>
        <Form.Label htmlFor='volume'>Volume</Form.Label>
        <Form.Slider
          name='volume'
          min={min}
          max={max}
          step={step}
        />
        <Form.Error name='volume' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const SliderWithDefaultValue: Story = {
  render: () => (
    <Form
      schema={z.object({
        brightness: z.number().min(0).max(100),
      })}
      onSubmit={async (data: { brightness: number }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='brightness'>
        <Form.Label htmlFor='brightness'>Brightness</Form.Label>
        <Form.Slider
          name='brightness'
          min={0}
          max={100}
          step={5}
          defaultValue={50}
        />
        <Form.Error name='brightness' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const DisabledSlider: Story = {
  render: () => (
    <Form
      schema={z.object({
        speed: z.number().optional(),
      })}
      onSubmit={async (data: { speed?: number }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='speed'>
        <Form.Label htmlFor='speed'>Speed</Form.Label>
        <Form.Slider
          name='speed'
          min={0}
          max={200}
          step={10}
          disabled
        />
        <Form.Error name='speed' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const SliderWithError: Story = {
  render: () => (
    <Form
      schema={z.object({
        temperature: z
          .number()
          .min(10, 'Temperature must be at least 10')
          .max(30, 'Temperature must not exceed 30'),
      })}
      onSubmit={async (data: { temperature: number }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='temperature'>
        <Form.Label htmlFor='temperature'>Temperature</Form.Label>
        <Form.Slider
          name='temperature'
          min={0}
          max={40}
          step={1}
        />
        <Form.Error name='temperature' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const SliderWithPrefixAndSuffix: Story = {
  render: () => (
    <Form
      schema={z.object({
        price: z.number().min(0).max(1000),
      })}
      onSubmit={async (data: { price: number }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='price'>
        <Form.Label htmlFor='price'>Price</Form.Label>
        <Form.Slider
          name='price'
          min={0}
          max={1000}
          step={50}
          valuePrefix='$'
          valueSuffix=' USD'
        />
        <Form.Error name='price' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const BasicSwitch: Story = {
  render: () => (
    <Form
      schema={z.object({
        notifications: z.boolean(),
      })}
      onSubmit={async (data: { notifications: boolean }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='notifications'>
        <Form.Label htmlFor='notifications'>Enable Notifications</Form.Label>
        <Switch name='notifications' />
        <Form.Error name='notifications' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const DisabledSwitch: Story = {
  render: () => (
    <Form
      schema={z.object({
        notifications: z.boolean().optional(),
      })}
      onSubmit={async (data: { notifications?: boolean }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='notifications'>
        <Form.Label htmlFor='notifications'>Enable Notifications</Form.Label>
        <Switch
          name='notifications'
          disabled
        />
        <Form.Error name='notifications' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const SwitchWithCustomColors: Story = {
  render: () => (
    <Form
      schema={z.object({
        darkMode: z.boolean(),
      })}
      onSubmit={async (data: { darkMode: boolean }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='darkMode'>
        <Form.Label htmlFor='darkMode'>Enable Dark Mode</Form.Label>
        <Switch
          name='darkMode'
          onColor='bg-green-500'
          offColor='bg-red-500'
        />
        <Form.Error name='darkMode' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const SwitchWithError: Story = {
  render: () => (
    <Form
      schema={z.object({
        notifications: z.boolean().refine(() => false, {
          message: 'This is a forced error',
        }),
      })}
      onSubmit={async (data: { notifications: boolean }) => {
        console.log('Form submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='notifications'>
        <Form.Label htmlFor='notifications'>Enable Notifications</Form.Label>
        <Switch name='notifications' />
        <Form.Error name='notifications' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const BasicFileInput: Story = {
  render: () => (
    <Form
      schema={z.object({
        file: z.array(z.instanceof(File)).optional(),
      })}
      onSubmit={async (data: { file?: File[] }) => {
        console.log('File submitted:', data.file ? Array.from(data.file) : 'No file')
        return { success: true }
      }}
    >
      <Form.Field name='file'>
        <Form.Label htmlFor='file'>Upload File</Form.Label>
        <FileInput name='file' />
        <Form.Error name='file' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const FileInputWithValidation: Story = {
  render: () => (
    <Form
      schema={z.object({
        file: z
          .array(z.instanceof(File))
          .refine((files) => files.every((file) => file.size <= 1024 * 1024), {
            message: 'Each file must not exceed 1MB',
          }),
      })}
      onSubmit={async (data: { file: File[] }) => {
        console.log('File submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='file'>
        <Form.Label htmlFor='file'>Upload File (Max 1MB)</Form.Label>
        <FileInput
          name='file'
          // maxSizeMB={1}
        />
        <Form.Error name='file' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const MultipleFileInput: Story = {
  render: () => (
    <Form
      schema={z.object({
        files: z.array(z.instanceof(File)).min(1, 'At least one file is required'),
      })}
      onSubmit={async (data: { files: File[] }) => {
        console.log('Files submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='files'>
        <Form.Label htmlFor='files'>Upload Multiple Files</Form.Label>
        <FileInput
          name='files'
          multiple
          // maxFiles={5}
        />
        <Form.Error name='files' />
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const FileInputWithDescription: Story = {
  render: () => (
    <Form
      schema={z.object({
        file: z.array(z.instanceof(File)).optional(),
      })}
      onSubmit={async (data: { file?: File[] }) => {
        console.log('File submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='file'>
        <Form.Label htmlFor='file'>Upload File</Form.Label>
        <FileInput
          name='file'
          description='Accepted formats: PNG, JPG. Max size: 2MB.'
          accept='.png,.jpg'
        />
        <Form.Error name='file' />
      </Form.Field>
      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const MultipleFileInputWithSizeValidation: Story = {
  render: () => (
    <Form
      schema={z.object({
        files: z
          .custom<File>()
          .array()
          .min(1, 'Please select at least one file')
          .max(3, 'Maximum 3 files allowed')
          .refine((files) => files.every((file) => file.size <= 1024 * 1024), {
            message: 'Some files exceed the 1MB limit',
            path: ['files'],
          })
          .superRefine((files, ctx) => {
            files.forEach((file, index) => {
              if (file.size > 1024 * 1024) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${file.name} exceeds 1MB`,
                  path: [index],
                })
              }
            })
          }),
      })}
      onSubmit={async (data) => {
        console.log('Submitted files:', data.files)
        return { success: true }
      }}
    >
      <Form.Field name='files'>
        <Form.Label>Upload Files</Form.Label>
        <FileInput
          name='files'
          multiple
        />
        <Form.Error name='files' />
      </Form.Field>
      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const BasicDatePicker: Story = {
  render: () => (
    <Form
      schema={z.object({
        date: z.date({
          invalid_type_error: 'Please select a valid date',
        }),
      })}
      onSubmit={async (data: { date: Date }) => {
        console.log('Date submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='date'>
        <Form.Label htmlFor='date'>Select Date</Form.Label>
        <Form.DatePicker
          name='date'
          required
        />
        <Form.Error name='date' />
      </Form.Field>
      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const RequiredDatePicker: Story = {
  render: () => (
    <Form
      schema={z.object({
        date: z.date({
          invalid_type_error: 'Please select a valid date',
        }),
      })}
      onSubmit={async (data: { date: Date }) => {
        console.log('Date submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='date'>
        <Form.Label htmlFor='date'>Date (Required)</Form.Label>
        <Form.DatePicker
          name='date'
          required
        />
        <Form.Error name='date' />
      </Form.Field>
      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const DatePickerWithDefaultValue: Story = {
  render: () => (
    <Form
      schema={z.object({
        date: z.date({
          invalid_type_error: 'Please select a valid date',
        }),
      })}
      onSubmit={async (data: { date?: Date }) => {
        console.log('Date submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='date'>
        <Form.Label htmlFor='date'>Date (Default: 2025-01-01)</Form.Label>
        <Form.DatePicker
          name='date'
          defaultValue={new Date(2025, 1, 1)}
        />
        <Form.Error name='date' />
      </Form.Field>
      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const DisabledDatePicker: Story = {
  render: () => (
    <Form
      schema={z.object({
        date: z.date({
          invalid_type_error: 'Please select a valid date',
        }),
      })}
      onSubmit={async (data: { date?: Date }) => {
        console.log('Date submitted:', data)
        return { success: true }
      }}
    >
      <Form.Field name='date'>
        <Form.Label htmlFor='date'>Date (Disabled)</Form.Label>
        <Form.DatePicker
          name='date'
          disabled
        />
        <Form.Error name='date' />
      </Form.Field>
      <Form.Submit>Submit</Form.Submit>
    </Form>
  ),
}

export const DatePickerWithMinMax: Story = {
  render: () => {
    const minDate = new Date('2025-01-01')
    const maxDate = new Date('2025-12-31')
    return (
      <Form
        schema={z.object({
          date: z
            .date({
              required_error: 'Please select a date',
              invalid_type_error: 'Please select a valid date',
            })
            .min(minDate, { message: 'Date must be in 2025' })
            .max(maxDate, { message: 'Date must be in 2025' })
            .optional(),
        })}
        onSubmit={async (data: { date?: Date }) => {
          console.log('Date submitted:', data)
          return { success: true }
        }}
      >
        <Form.Field name='date'>
          <Form.Label htmlFor='date'>Date (2025 only)</Form.Label>
          <Form.DatePicker name='date' />
          <Form.Error name='date' />
        </Form.Field>
        <Form.Submit>Submit</Form.Submit>
      </Form>
    )
  },
}
